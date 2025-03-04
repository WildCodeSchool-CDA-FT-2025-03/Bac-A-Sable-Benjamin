import express, { Request, Response } from 'express';
import { loadRoutes } from './utils/loadRoutes';

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Ok ! 🧙‍♂️');
});

loadRoutes(app, "src/routes");

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port http://localhost:${PORT} 🦥`);
});