import Unsubscribe from '../infra/typeorm/entities/Unsubscribe';

export default interface IUnsubscribeRepository {
  create(cod: string, email: string): Promise<Unsubscribe>;
  findAllUnsubscribe(): Promise<Unsubscribe[]>;
}
