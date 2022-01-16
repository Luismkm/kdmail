import Unsubscribe from '../infra/typeorm/entities/Unsubscribe';

export interface ICreateUnsubscribeRepository {
  create(cod: string, email: string): Promise<Unsubscribe | null>;
}
