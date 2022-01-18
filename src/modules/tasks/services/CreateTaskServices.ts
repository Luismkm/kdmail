import { injectable, inject } from 'tsyringe';
import Task from '../infra/typeorm/entities/Task';
import { ICreateTaskRepository } from '../repositories';

interface IRequest {
  user_id: string;
  description: string;
  status: string;
}

@injectable()
class CreateTaskServices {
  constructor(
    @inject('TasksRepository')
    private createTasksRepository: ICreateTaskRepository,
  ) {}

  public async execute(task: IRequest): Promise<Task> {
    const createdTask = await this.createTasksRepository.create(task);

    return createdTask;
  }
}

export default CreateTaskServices;
