import User from '../infra/typeorm/entities/User';

export default interface IClientsRepository {
  create(data: any): Promise<User>;
}
