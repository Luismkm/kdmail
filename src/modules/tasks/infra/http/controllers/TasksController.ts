import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTaskServices from '@modules/tasks/services/CreateTaskServices';
import ShowTaskServices from '@modules/tasks/services/ShowTasksServices';
import DeleteTaskServices from '@modules/tasks/services/DeleteTaskServices';

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

  public async index(request: Request, response: Response): Promise<Response> {
    const tasksList = container.resolve(ShowTaskServices);
    const tasks = await tasksList.execute();

    return response.status(200).json(tasks);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { task_id } = request.params;
    const tasks = container.resolve(DeleteTaskServices);
    await tasks.execute(task_id);

    return response.status(204).json();
  }
}
