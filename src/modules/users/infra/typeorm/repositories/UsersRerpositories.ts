import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({ name, password, role }: any): Promise<User> {
    const userData = this.ormRepository.create({ name, password, role });

    await this.ormRepository.save(userData);

    return userData;
  }
}

export default UsersRepository;
