import { Router } from 'express';
import UnsubscribeController from '../controllers/UnsubscribeController';

const unsubscribeRouter = Router();

const unsubscribeController = new UnsubscribeController();

unsubscribeRouter.get('/:token', unsubscribeController.create);

export default unsubscribeRouter;
