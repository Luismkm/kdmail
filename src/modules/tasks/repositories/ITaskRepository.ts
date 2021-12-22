import Tasks from '../infra/typeorm/entities/Task';

import ICreateTaskDTO from '../dtos/ICreateTaskDTO';

export default interface ITasksRepository {
  create(data: ICreateTaskDTO): Promise<Tasks>;
  findAll(status: string): Promise<Tasks[]>;
  updateDescription(id_task: string, description: string): Promise<Tasks>;
}
