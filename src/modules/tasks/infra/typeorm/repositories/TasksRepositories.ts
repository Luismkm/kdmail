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
    const tasksList = await this.ormRepository.find({
      where: {
        status,
      },
      relations: ['user'],
    });
    tasksList.forEach(task => {
      delete task.user.password;
    });

    return tasksList;
  }

  public async updateDescription(
    id_task: string,
    description: string,
  ): Promise<Task> {
    const task = await this.ormRepository.save({ id: id_task, description });
    console.log(task);
    return task;
  }
}

export default TasksRepository;
