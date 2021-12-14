import { Router } from 'express';

import CreateUserController from '../controllers/CreateUserController';

const userRouter = Router();
const createUserController = new CreateUserController();

userRouter.post('/create', createUserController.create);

export default userRouter;
