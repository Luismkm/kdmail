import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

export default interface ICreateUsersRepositoryInject {
  create(data: ICreateUserDTO): Promise<User>;
  load(name: string): Promise<User>;
}
