import { inject, injectable } from 'tsyringe';
import ITasksRepository from '../repositories/ITaskRepository';

@injectable()
export default class DeleteTaskServices {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,
  ) {}

  public async execute(task_id: string): Promise<void> {
    await this.tasksRepository.delete(task_id);
  }
}
