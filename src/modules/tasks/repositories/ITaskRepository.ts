import Tasks from '../infra/typeorm/entities/Task';

import ICreateTaskDTO from '../dtos/ICreateTaskDTO';

export default interface ITasksRepository {
  create(data: ICreateTaskDTO): Promise<Tasks>;
}
