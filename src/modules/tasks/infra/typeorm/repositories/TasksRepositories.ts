import { getRepository, Repository } from 'typeorm';

import ITasksRepository from '@modules/tasks/repositories/ITaskRepository';
import ICreateTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';

import Task from '../entities/Task';

class TasksRepository implements ITasksRepository {
  private ormRepository: Repository<Task>;

  constructor() {
    this.ormRepository = getRepository(Task);
  }

  public async create(task: ICreateTaskDTO): Promise<Task> {
    const taskData = this.ormRepository.create(task);

    await this.ormRepository.save(taskData);

    return taskData;
  }

  public async findAll(status: string): Promise<Task[]> {
    const tasksList = this.ormRepository.find({
      where: {
        status,
      },
    });
    return tasksList;
  }
}

export default TasksRepository;
