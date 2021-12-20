import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTaskServices from '@modules/tasks/services/CreateTaskServices';
import ShowTaskServices from '@modules/tasks/services/ShowTasksServices';

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

  public async show(request: Request, response: Response): Promise<Response> {
    const { status } = request.query;
    const tasksList = container.resolve(ShowTaskServices);
    const tasks = await tasksList.execute(String(status));

    return response.status(200).json(tasks);
  }
}
