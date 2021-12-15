import User from '../infra/typeorm/entities/User';

import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IClientsRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByName(name: string): Promise<User | undefined>;
}
