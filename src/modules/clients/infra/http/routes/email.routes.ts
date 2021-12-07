import { Router } from 'express';

import multer from 'multer';

import SendEmailController from '@modules/clients/infra/http/controllers/SendEmailController';
import CreateClientController from '@modules/clients/infra/http/controllers/CreateClientController';

const multerConfig = multer();

const emailRouter = Router();
const sendEmailController = new SendEmailController();
const createClientController = new CreateClientController();

emailRouter.post('/send', sendEmailController.create);
emailRouter.get('/status', sendEmailController.show);
emailRouter.post(
  '/validation',
  multerConfig.single('file'),
  createClientController.create,
);
emailRouter.delete('/clearList', sendEmailController.delete);

export default emailRouter;
