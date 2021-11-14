import { Router } from 'express';

import emailRouter from '@modules/clients/infra/http/routes/email.routes';

const routes = Router();

routes.use('/email', emailRouter);
routes.use('/email', emailRouter);

export default routes;
