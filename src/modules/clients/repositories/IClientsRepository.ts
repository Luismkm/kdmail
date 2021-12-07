import IStatusDTO from '../dtos/IFindAllClientsGroupByStatusDTO';
import Client from '../infra/typeorm/entities/Client';

export default interface IClientsRepository {
  findAllClients(numberOfSends: number): Promise<Client[]>;
  create(data: any): Promise<number>;
  updateStatusSended(code: string, status: string): Promise<void>;
  findAllClientsGroupByStatus(): Promise<IStatusDTO[]>;
  deleteAllClients(): Promise<void>;
}
