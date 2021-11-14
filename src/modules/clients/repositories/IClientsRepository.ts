import ICreateClientDTO from '../dtos/ICreateClientDTO';
import Client from '../infra/typeorm/entities/Client';

export default interface IClientsRepository {
  findAllClients(numberOfSends: number): Promise<Client[]>;
  create(data: any): Promise<Client>;
  updateStatusSended(code: string, status: string): Promise<void>;
}
