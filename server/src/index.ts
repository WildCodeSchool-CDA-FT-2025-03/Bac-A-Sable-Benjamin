import express, { Request, Response } from 'express';
import { loadRoutes } from './utils/loadRoutes';
import { config } from 'dotenv';
import cors from 'cors';

config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.get('/', (req: Request, res: Response) => {
  res.send('Ok ! 🧙‍♂️');
});

loadRoutes(app, "src/routes");

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port http://localhost:${PORT} 🦥`);
});