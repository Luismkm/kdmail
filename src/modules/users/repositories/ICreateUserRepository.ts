import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

export interface ICreateUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
}
