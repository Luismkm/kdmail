import { injectable, inject } from 'tsyringe';
import Task from '../infra/typeorm/entities/Task';

import ITasksRepository from '../repositories/ITaskRepository';

interface IRequest {
  user_id: string;
  description: string;
  status: string;
}

@injectable()
class CreateTaskServices {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  public async execute(task: IRequest): Promise<Task> {
    const createdTask = await this.tasksRepository.create(task);

    return createdTask;
  }
}

export default CreateTaskServices;
