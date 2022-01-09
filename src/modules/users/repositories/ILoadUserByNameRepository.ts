import { User } from '../infra/typeorm/entities/User';

export interface ILoadUserByNameRepository {
  load(name: string): Promise<User | undefined>;
}
