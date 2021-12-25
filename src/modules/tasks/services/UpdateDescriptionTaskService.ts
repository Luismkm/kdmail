import { injectable, inject } from 'tsyringe';
import Task from '../infra/typeorm/entities/Task';

import ITasksRepository from '../repositories/ITaskRepository';

interface IRequest {
  user_id: string;
  description: string;
  status: string;
}

@injectable()
export default class UpdateDescriptionTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  public async execute(task_id: string, description: string): Promise<Task> {
    const task = await this.tasksRepository.updateDescription(
      task_id,
      description,
    );

    return task;
  }
}
