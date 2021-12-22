import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import TasksController from '../controllers/TasksController';

const tasksRouter = Router();
const tasksController = new TasksController();

tasksRouter.use(ensureAuthenticated);

tasksRouter.post('/create', tasksController.create);
tasksRouter.patch('/update/:task_id/:description', tasksController.update);
tasksRouter.get('/list', tasksController.show);

export default tasksRouter;
