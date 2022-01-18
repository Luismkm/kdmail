import { injectable, inject } from 'tsyringe';
import Task from '../infra/typeorm/entities/Task';
import { IFindAllOpenTaskRepository } from '../repositories';

interface IRequest {
  user_id: string;
  description: string;
  status: string;
}

@injectable()
class ShowTaskServices {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: IFindAllOpenTaskRepository,
  ) {}

  public async execute(): Promise<Task[]> {
    const tasksList = await this.tasksRepository.findAllOpenTask();

    return tasksList;
  }
}

export default ShowTaskServices;
