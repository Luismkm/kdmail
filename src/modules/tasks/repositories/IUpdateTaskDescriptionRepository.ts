import Tasks from '../infra/typeorm/entities/Task';

export interface IUpdateTaskDescriptionRepository {
  updateDescription(task_id: string, description: string): Promise<Tasks>;
}
