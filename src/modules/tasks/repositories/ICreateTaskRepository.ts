import Tasks from '../infra/typeorm/entities/Task';
import ICreateTaskDTO from '../dtos/ICreateTaskDTO';

export interface ICreateTaskRepository {
  create(data: ICreateTaskDTO): Promise<Tasks>;
}
