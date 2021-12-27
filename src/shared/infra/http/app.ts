import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import express, { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';
import cors from 'cors';
import http from 'http';

import { Server } from 'socket.io';

import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();
app.use(cors());

const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
  cors: {
    origin: '*',
  },
});

io.on('connection', socket => {
  console.log(`Usuário conectado no socket ${socket.id}`);
});

app.use(express.json());
app.use(routes);

/* app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
); */

export { serverHttp, io };
