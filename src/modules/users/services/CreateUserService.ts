import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { User } from '../infra/typeorm/entities/User';

import { IHashGenerate } from '../providers/HashProvider/models/IHashGenerate';
import { ICreateUserRepository } from '../repositories/ICreateUserRepository';
import { ILoadUserByNameRepository } from '../repositories/ILoadUserByNameRepository';

interface IRequest {
  name: string;
  password: string;
  role: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private loadUserByNameRepository: ILoadUserByNameRepository,

    @inject('UsersRepository')
    private createUserRepository: ICreateUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashGenerate,
  ) {}

  public async execute({ name, password, role = '' }: IRequest): Promise<User> {
    const checkUserExists = await this.loadUserByNameRepository.load(name);

    if (!checkUserExists) {
      const hashedPassword = await this.hashProvider.hashGenerate(password);
      const createdUser = await this.createUserRepository.create({
        name,
        password: hashedPassword,
        role,
      });

      return createdUser;
    }
    throw new AppError('Name already in use.', 403);
  }
}

export default CreateUserService;
