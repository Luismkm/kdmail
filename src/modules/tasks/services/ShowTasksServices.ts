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

  public async execute(): Promise<Task[]> {
    const tasksList = await this.tasksRepository.findAllOpenTasks();

    return tasksList;
  }
}

export default ShowTaskServices;
