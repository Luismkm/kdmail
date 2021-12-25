import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import TasksController from '../controllers/TasksController';
import UpdateTaskDescriptionController from '../controllers/UpdateTaskDescriptionController';
import UpdateTaskStatusController from '../controllers/UpdateTaskStatusController';

const tasksRouter = Router();
const tasksController = new TasksController();
const updateTaskDescriptionController = new UpdateTaskDescriptionController();
const updateTaskStatusController = new UpdateTaskStatusController();

tasksRouter.use(ensureAuthenticated);

tasksRouter.post('/create', tasksController.create);
tasksRouter.get('/list', tasksController.index);

tasksRouter.patch(
  '/update/description',
  updateTaskDescriptionController.update,
);

tasksRouter.patch('/update/status', updateTaskStatusController.update);

export default tasksRouter;
