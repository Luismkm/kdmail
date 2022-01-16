import { getRepository, Repository } from 'typeorm';

import { ICreateUserRepository } from '@modules/users/repositories/ICreateUserRepository';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { ILoadUserByNameRepository } from '@modules/users/repositories/ILoadUserByNameRepository';
import { User } from '../entities/User';

class UsersRepository
  implements ICreateUserRepository, ILoadUserByNameRepository
{
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({ name, password, role }: ICreateUserDTO): Promise<User> {
    const userData = this.ormRepository.create({ name, password, role });
    await this.ormRepository.save(userData);
    return userData;
  }

  public async load(name: string): Promise<User> {
    const user = this.ormRepository.findOne({ where: { name } });
    return user;
  }
}

export default UsersRepository;
