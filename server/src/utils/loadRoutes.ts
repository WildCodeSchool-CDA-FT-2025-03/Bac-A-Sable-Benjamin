import { Express } from 'express';
import { readdirSync, existsSync } from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

/**
 * Charge automatiquement tous les routeurs du dossier routes
 * et les enregistre sous le préfixe /api
 * 
 * @param app Application Express
 * @param routesDir Chemin vers le dossier des routes (par défaut: './routes')
 */
export const loadRoutes = (app: Express, routesDir: string = './routes') => {
  if (!existsSync(routesDir)) {
    console.warn(`Le dossier ${routesDir} n'existe pas. Aucune route n'a été chargée.`);
    return;
  }

  const files = readdirSync(routesDir);

  files.forEach(async (file: string) => {
    if (!['.ts', '.js'].includes(path.extname(file))) {
      return;
    }

    const filePath = path.join(routesDir, file);

    try {
      const router = await import(pathToFileURL(filePath).href);
      
      const routeName = path.basename(file, path.extname(file));
      
      const routePath = routeName === 'index' ? '/api' : `/api/${routeName}`;
      
      app.use(routePath, router.default);
      console.log(`Route chargée: ${routePath}`);
    } catch (error) {
      console.error(`Erreur lors du chargement de la route ${file}:`, error);
    }
  });

  console.log('Toutes les routes ont été chargées.');
};

export default loadRoutes;