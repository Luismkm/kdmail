import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';
import { User } from '../infra/typeorm/entities/User';

import { ILoadUserByNameRepository } from '../repositories/ILoadUserByNameRepository';
import { IHashCompare } from '../providers/HashProvider/models/IHashCompare';

interface IRequest {
  name: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private loadUser: ILoadUserByNameRepository,

    @inject('HashProvider')
    private hashProvider: IHashCompare,
  ) {}

  public async execute({ name, password }: IRequest): Promise<IResponse> {
    const user = await this.loadUser.load(name);

    if (!user) {
      throw new AppError('Incorrect name/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.hashCompare(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect name/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export { AuthenticateUserService };
