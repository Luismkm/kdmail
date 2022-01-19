import { injectable, inject } from 'tsyringe';
import Task from '../infra/typeorm/entities/Task';
import { IUpdateTaskStatusRepository } from '../repositories';

@injectable()
export default class UpdateStatusTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: IUpdateTaskStatusRepository,
  ) {}

  public async execute(task_id: string, status: string): Promise<Task> {
    const task = await this.tasksRepository.updateStatus(task_id, status);

    return task;
  }
}
