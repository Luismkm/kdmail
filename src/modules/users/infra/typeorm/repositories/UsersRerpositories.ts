import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({ name, password, role }: ICreateUserDTO): Promise<User> {
    const userData = this.ormRepository.create({ name, password, role });

    await this.ormRepository.save(userData);

    return userData;
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({ where: { name } });
    return user;
  }
}

export default UsersRepository;
