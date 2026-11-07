import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import gameRoutes from './routes/game.routes';
import { notFound, errorHandler } from './middleware/errorHandler';

const app = express();

// Global middleware
app.use(helmet());
app.use(cors({ origin: env.clientUrl }));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/game', gameRoutes);

// Error handling (keep last)
app.use(notFound);
app.use(errorHandler);

export default app;
