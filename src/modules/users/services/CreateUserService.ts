import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  password: string;
  role: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, password, role = '' }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByName(name);

    if (checkUserExists) {
      throw new AppError('Name already in use.', 403);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);
    const createdUser = await this.usersRepository.create({
      name,
      password: hashedPassword,
      role,
    });

    return createdUser;
  }
}

export default CreateUserService;
