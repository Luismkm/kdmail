import { inject, injectable } from 'tsyringe';
import { IDeleteTaskRepository } from '../repositories';

@injectable()
export default class DeleteTaskServices {
  constructor(
    @inject('TasksRepository')
    private deleteTasksRepository: IDeleteTaskRepository,
  ) {}

  public async execute(task_id: string): Promise<void> {
    await this.deleteTasksRepository.delete(task_id);
  }
}
