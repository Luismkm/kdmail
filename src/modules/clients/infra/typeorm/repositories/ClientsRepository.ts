import { getRepository, Repository } from 'typeorm';

import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';
import IStatusDTO from '@modules/clients/dtos/IFindAllClientsGroupByStatusDTO';
import IClientsRepository from '@modules/clients/repositories/Client/IClientsRepository';

import Client from '../entities/Client';

class ClientsRepository implements IClientsRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  public async create({
    clientsWithoutUnsubscribe,
  }: ICreateClientDTO): Promise<number> {
    const clientsData = this.ormRepository.create(clientsWithoutUnsubscribe);

    await this.ormRepository.save(clientsData);

    return null;
  }

  public async findAllClients(numberOfSends: number): Promise<Client[]> {
    const clients = await this.ormRepository.find({
      where: { sended: 'N' },
      take: numberOfSends,
    });
    return clients;
  }

  public async updateStatusSended(cod: string, status: string): Promise<void> {
    await this.ormRepository.save({
      cod,
      sended: status,
    });
  }

  public async findAllClientsGroupByStatus(): Promise<IStatusDTO[]> {
    const status = await this.ormRepository.query(
      'select COUNT(*),sended FROM clients group by sended ',
    );
    return status;
  }

  public async deleteAllClients(): Promise<void> {
    await this.ormRepository.clear();
  }
}

export default ClientsRepository;
