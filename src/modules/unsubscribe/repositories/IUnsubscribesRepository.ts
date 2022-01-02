import Unsubscribe from '../infra/typeorm/entities/Unsubscribe';

export default interface IUnsubscribesRepository {
  create(cod: string, email: string): Promise<void>;
  findAllUnsubscribe(): Promise<Unsubscribe[]>;
}
