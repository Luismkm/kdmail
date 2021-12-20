import { injectable, inject } from 'tsyringe';
import Task from '../infra/typeorm/entities/Task';

import ITasksRepository from '../repositories/ITaskRepository';

interface IRequest {
  user_id: string;
  description: string;
  status: string;
}

@injectable()
class ShowTaskServices {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  public async execute(status: string): Promise<Task[]> {
    const tasksList = await this.tasksRepository.findAll(status);

    return tasksList;
  }
}

export default ShowTaskServices;
