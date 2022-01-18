import ICreateTaskDTO from '../dtos/ICreateTaskDTO';
import Tasks from '../infra/typeorm/entities/Task';
import { ICreateTaskRepository } from '../repositories';

export const mockCreateTaskRepository = (): ICreateTaskRepository => {
  class CreateTaskRepository implements ICreateTaskRepository {
    async create(data: ICreateTaskDTO): Promise<Tasks> {
      return Promise.resolve({
        id: 'any_id',
        user_id: 'any_user_id',
        description: 'any_description',
        status: 'any_status',
        created_at: new Date('11/11/2020'),
        updated_at: new Date('11/11/2020'),
      } as Tasks);
    }
  }
  return new CreateTaskRepository();
};
