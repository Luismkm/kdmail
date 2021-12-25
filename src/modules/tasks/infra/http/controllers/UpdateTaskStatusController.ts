import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateStatusTaskService from '@modules/tasks/services/UpdateStatusTaskService';

export default class UpdateTaskStatusController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { task_id, status } = request.body;

    const task = container.resolve(UpdateStatusTaskService);
    const updatedTask = await task.execute(task_id, status);

    return response.status(200).json(updatedTask);
  }
}
