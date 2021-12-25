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

  public async findAllOpenTasks(): Promise<Task[]> {
    const tasksList = await this.ormRepository.find({
      where: [{ status: 'Pendente' }, { status: 'Em andamento' }],
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
}

export default TasksRepository;
