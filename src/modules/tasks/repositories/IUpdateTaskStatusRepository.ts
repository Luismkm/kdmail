import Tasks from '../infra/typeorm/entities/Task';

export interface IUpdateTaskStatusRepository {
  updateStatus(task_id: string, status: string): Promise<Tasks>;
}
