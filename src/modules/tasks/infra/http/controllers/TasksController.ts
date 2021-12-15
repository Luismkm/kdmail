import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTaskServices from '@modules/tasks/services/CreateTaskServices';

export default class TasksController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { description, status } = request.body;

    const createTask = container.resolve(CreateTaskServices);

    const createdTask = await createTask.execute({
      user_id,
      description,
      status,
    });

    return response.status(200).json({ createdTask });
  }
}
