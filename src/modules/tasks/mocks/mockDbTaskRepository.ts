import ICreateTaskDTO from '../dtos/ICreateTaskDTO';
import Tasks from '../infra/typeorm/entities/Task';
import {
  ICreateTaskRepository,
  IDeleteTaskRepository,
  IFindAllOpenTaskRepository,
  IUpdateTaskDescriptionRepository,
  IUpdateTaskStatusRepository,
} from '../repositories';

export const mockCreateTaskRepository = (): ICreateTaskRepository => {
  class CreateTaskRepositoryStub implements ICreateTaskRepository {
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
  return new CreateTaskRepositoryStub();
};

export const mockDeleteTaskRepository = (): IDeleteTaskRepository => {
  class DeleteTaskServicesStub implements IDeleteTaskRepository {
    async delete(task_id: string): Promise<void> {}
  }
  return new DeleteTaskServicesStub();
};

export const mockFindAllOpenTaskRepository = (): IFindAllOpenTaskRepository => {
  class FindAllOpenTaskRepositoryStub implements IFindAllOpenTaskRepository {
    async findAllOpenTask(): Promise<Tasks[]> {
      return Promise.resolve([
        {
          id: 'any_id',
          user_id: 'any_user_id',
          description: 'any_description',
          status: 'any_status',
          created_at: new Date('11/11/2020'),
          updated_at: new Date('11/11/2020'),
        } as Tasks,
        {
          id: 'other_id',
          user_id: 'other_user_id',
          description: 'other_description',
          status: 'other_status',
          created_at: new Date('11/11/2020'),
          updated_at: new Date('11/11/2020'),
        } as Tasks,
      ]);
    }
  }
  return new FindAllOpenTaskRepositoryStub();
};

export const mockUpdateTaskDescriptionRepository =
  (): IUpdateTaskDescriptionRepository => {
    class UpdateTaskDescriptionRepositoryStub
      implements IUpdateTaskDescriptionRepository
    {
      async updateDescription(
        task_id: string,
        description: string,
      ): Promise<Tasks> {
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
    return new UpdateTaskDescriptionRepositoryStub();
  };

export const mockUpdateTaskStatusRepository =
  (): IUpdateTaskStatusRepository => {
    class UpdateStatusTaskServiceStub implements IUpdateTaskStatusRepository {
      async updateStatus(task_id: string, status: string): Promise<Tasks> {
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
    return new UpdateStatusTaskServiceStub();
  };
