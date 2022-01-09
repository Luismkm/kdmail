import { User } from '../infra/typeorm/entities/User';
import { ILoadUserByNameRepository } from '../repositories/ILoadUserByNameRepository';

export const mockLoadUserByNameRepository = (): ILoadUserByNameRepository => {
  class LoadUserByNameRepositoryStub implements ILoadUserByNameRepository {
    async load(name: string): Promise<User> {
      return Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        password: 'hashed_password',
        role: 'any_role',
        created_at: new Date('11/11/2020'),
      });
    }
  }
  return new LoadUserByNameRepositoryStub();
};
