import Tasks from '../infra/typeorm/entities/Task';

export interface IFindAllOpenTaskRepository {
  findAllOpenTask(): Promise<Tasks[]>;
}
