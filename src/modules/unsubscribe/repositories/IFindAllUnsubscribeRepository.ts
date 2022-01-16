import Unsubscribe from '../infra/typeorm/entities/Unsubscribe';

export interface IFindAllUnsubscribeRepository {
  findAllUnsubscribe(): Promise<Unsubscribe[]>;
}
