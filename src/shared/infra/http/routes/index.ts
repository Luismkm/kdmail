import { Router } from 'express';

import emailRouter from '@modules/clients/infra/http/routes/email.routes';
import tasksRouter from '@modules/tasks/infra/http/routes/tasks.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/email', emailRouter);
routes.use('/tasks', tasksRouter);
routes.use('/users', usersRouter);

export default routes;
