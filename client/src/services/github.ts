import { api } from './api';
import { z } from 'zod';

const RepoSchema = z.object({
  name: z.string(),
  description: z.string().nullable().optional(),
  url: z.string().url(),
  visibility: z.enum(["PUBLIC", "PRIVATE"]),
  isPrivate: z.boolean(),
  createdAt: z.string().datetime(),
  stargazerCount: z.number(),
  forkCount: z.number(),
  primaryLanguage: z.object({
    name: z.string()
  }).nullable().optional(),
  languages: z.array(z.object({
    size: z.number(),
    node: z.object({
      name: z.string()
    }),
  })),
});

const GithubReposResponseSchema = z.object({
  success: z.boolean(),
  username: z.string(),
  count: z.number(),
  repos: z.array(RepoSchema)
});

export type Repo = z.infer<typeof RepoSchema>;
export type GithubReposResponse = z.infer<typeof GithubReposResponseSchema>;

export const getRepos = async (username: string): Promise<GithubReposResponse> => {
  try {
    const response = await api.get(`/github/repos/${username}`);
    
    const validatedData = GithubReposResponseSchema.parse(response.data);
    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Erreur de validation des données:', error.errors);
    }
    console.error('Erreur lors de la récupération des repos:', error);
    throw error;
  }
};