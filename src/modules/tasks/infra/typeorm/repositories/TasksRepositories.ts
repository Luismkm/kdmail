import { getRepository, Repository } from 'typeorm';

import ICreateTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';
import {
  ICreateTaskRepository,
  IDeleteTaskRepository,
  IFindAllOpenTaskRepository,
  IUpdateTaskDescriptionRepository,
  IUpdateTaskStatusRepository,
} from '@modules/tasks/repositories';
import Task from '../entities/Task';

class TasksRepository
  implements
    ICreateTaskRepository,
    IFindAllOpenTaskRepository,
    IUpdateTaskDescriptionRepository,
    IUpdateTaskStatusRepository,
    IDeleteTaskRepository
{
  private ormRepository: Repository<Task>;

  constructor() {
    this.ormRepository = getRepository(Task);
  }

  public async create(task: ICreateTaskDTO): Promise<Task> {
    const taskData = this.ormRepository.create(task);

    await this.ormRepository.save(taskData);

    return taskData;
  }

  public async findAllOpenTask(): Promise<Task[]> {
    const tasksList = await this.ormRepository.find({
      where: [{ status: 'Pendente' }, { status: 'Em andamento' }],
      order: {
        created_at: 'ASC',
      },
      relations: ['user'],
    });
    tasksList.forEach(task => {
      delete task.user.password;
    });

    return tasksList;
  }

  public async updateDescription(
    task_id: string,
    description: string,
  ): Promise<Task> {
    const task = await this.ormRepository.save({ id: task_id, description });
    return task;
  }

  public async updateStatus(task_id: string, status: string): Promise<Task> {
    const task = await this.ormRepository.save({ id: task_id, status });
    return task;
  }

  public async delete(task_id: string): Promise<void> {
    await this.ormRepository.delete(task_id);
  }
}

export default TasksRepository;
