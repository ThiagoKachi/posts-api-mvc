import 'dotenv/config';

import cors from 'cors';
import { drizzle } from 'drizzle-orm/node-postgres';
import express from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import { Pool } from 'pg';
import userRoutes from 'src/modules/users/routes/user.routes';

export const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: 'Too many requests, please try again later.',
}));

app.use('/api', userRoutes);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

export const db = drizzle(pool);
