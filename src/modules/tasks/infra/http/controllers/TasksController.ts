import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTaskServices from '@modules/tasks/services/CreateTaskServices';
import ShowTaskServices from '@modules/tasks/services/ShowTasksServices';
import UpdateDescriptionTaskService from '@modules/tasks/services/UpdateDescriptionTaskService';

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

  public async update(request: Request, response: Response): Promise<Response> {
    const { task_id, description } = request.params;
    console.log(task_id, description);

    const task = container.resolve(UpdateDescriptionTaskService);
    const updatedTask = await task.execute(task_id, description);

    return response.status(200).json(updatedTask);
  }
}
