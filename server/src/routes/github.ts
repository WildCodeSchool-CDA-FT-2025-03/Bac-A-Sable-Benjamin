import { Router, Request, Response } from "express";
import axios from "axios";

const router = Router();

const githubAPI = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
  }
});

if (process.env.GITHUB_TOKEN) {
  githubAPI.defaults.headers.common['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
}

async function getRepositoryLanguages(owner: string, repo: string) {
  try {
    const response = await githubAPI.get(`/repos/${owner}/${repo}/languages`);
    const languages = Object.entries(response.data).map(([name, size]) => ({
      node: { name },
      size: size as number
    }));
    return languages;
  } catch (error) {
    console.error(`Erreur lors de la récupération des langages pour ${owner}/${repo}:`, error);
    return [];
  }
}

router.get('/repos/:username', async (req: Request, res: Response): Promise<any> => {
  const { username } = req.params;

  try {
    const response = await githubAPI.get(`/users/${username}/repos`, {
      params: {
        per_page: 100,
        sort: 'updated',
        direction: 'desc'
      }
    });

    const reposPromises = response.data.map(async (repo: any) => {
      const languages = await getRepositoryLanguages(username, repo.name);

      return {
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        visibility: repo.private ? "PRIVATE" : "PUBLIC",
        isPrivate: repo.private,
        createdAt: repo.created_at,
        stargazerCount: repo.stargazers_count,
        forkCount: repo.forks_count,
        primaryLanguage: repo.language ? { name: repo.language } : null,
        languages: languages
      };
    });

    const repos = await Promise.all(reposPromises);

    return res.status(200).json({
      success: true,
      username,
      count: repos.length,
      repos
    });
  } catch (error: any) {
    console.error('Erreur lors de la récupération des dépôts:', error);
    
    if (error.response) {
      if (error.response.status === 404) {
        return res.status(404).json({
          success: false,
          error: 'Utilisateur non trouvé',
          details: `L'utilisateur "${username}" n'existe pas sur GitHub`
        });
      }
      
      if (error.response.status === 403) {
        return res.status(403).json({
          success: false,
          error: 'Limite de taux dépassée',
          details: 'Limite de taux de l\'API GitHub dépassée. Veuillez réessayer plus tard ou utiliser un token d\'authentification.'
        });
      }
      
      return res.status(error.response.status).json({
        success: false,
        error: 'Erreur lors de la récupération des dépôts',
        details: error.response.data?.message || 'Erreur de l\'API GitHub'
      });
    }
    
    return res.status(500).json({
      success: false,
      error: 'Erreur lors de la récupération des dépôts',
      details: error.message || 'Erreur inconnue'
    });
  }
});

export default router;