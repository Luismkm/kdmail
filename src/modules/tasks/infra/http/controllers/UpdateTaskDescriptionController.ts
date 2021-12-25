import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateDescriptionTaskService from '@modules/tasks/services/UpdateDescriptionTaskService';

export default class UpdateTaskDescriptionController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { task_id, description } = request.body;
    const task = container.resolve(UpdateDescriptionTaskService);
    const updatedTask = await task.execute(task_id, description);

    return response.status(200).json(updatedTask);
  }
}
