import Tasks from '../infra/typeorm/entities/Task';

import ICreateTaskDTO from '../dtos/ICreateTaskDTO';

export default interface ITasksRepository {
  create(data: ICreateTaskDTO): Promise<Tasks>;
  findAllOpenTasks(): Promise<Tasks[]>;
  delete(task_id: string): Promise<void>;
  updateDescription(task_id: string, description: string): Promise<Tasks>;
  updateStatus(task_id: string, status: string): Promise<Tasks>;
}
