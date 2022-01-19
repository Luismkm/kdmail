import { injectable, inject } from 'tsyringe';
import Task from '../infra/typeorm/entities/Task';
import { IUpdateTaskDescriptionRepository } from '../repositories';

@injectable()
export default class UpdateDescriptionTaskService {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: IUpdateTaskDescriptionRepository,
  ) {}

  public async execute(task_id: string, description: string): Promise<Task> {
    const task = await this.tasksRepository.updateDescription(
      task_id,
      description,
    );

    return task;
  }
}
