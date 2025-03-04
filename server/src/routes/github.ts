import { Router, Request, Response } from "express";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);
const router = Router();

router.get('/repos/:username', async (req: Request, res: Response): Promise<any> => {
    const { username } = req.params;
    
    try {
        const { stdout, stderr } = await execPromise(`gh repo list ${username} --json name,description,url,visibility,isPrivate,createdAt,stargazerCount,forkCount,primaryLanguage,languages --limit 100`);
        
        if (stderr) {
            console.error(`Erreur lors de l'exécution de la commande gh: ${stderr}`);
            return res.status(500).json({ 
                success: false, 
                error: 'Erreur lors de la récupération des repos',
                details: stderr
            });
        }
        
        const repos = JSON.parse(stdout);
        
        return res.status(200).json({
            success: true,
            username,
            count: repos.length,
            repos
        });
    } catch (error: any) {
        console.error('Erreur:', error);
        
        if (error.message && error.message.includes('command not found')) {
            return res.status(500).json({
                success: false,
                error: 'La commande "gh" n\'est pas installée sur le serveur',
                details: 'Veuillez installer GitHub CLI: https://cli.github.com/manual/installation'
            });
        }
        
        if (error.message && error.message.includes('authentication')) {
            return res.status(401).json({
                success: false,
                error: 'Erreur d\'authentification GitHub',
                details: 'Veuillez vous authentifier avec "gh auth login"'
            });
        }
        
        return res.status(500).json({
            success: false,
            error: 'Erreur lors de la récupération des repos',
            details: error.message || 'Erreur inconnue'
        });
    }
});

export default router;