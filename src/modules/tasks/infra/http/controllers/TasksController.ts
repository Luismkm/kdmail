import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTaskServices from '@modules/tasks/services/CreateTaskServices';

export default class TasksController {
  public async create(request: Request, response: Response): Promise<Response> {
    // const user_id = request.user.id;
    const user_id = '6775d21d-9ba0-4036-b636-d09a8450e132';
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
