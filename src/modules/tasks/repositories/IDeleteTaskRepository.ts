export interface IDeleteTaskRepository {
  delete(task_id: string): Promise<void>;
}
