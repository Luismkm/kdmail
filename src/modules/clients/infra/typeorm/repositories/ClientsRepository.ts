import { getRepository, Repository } from 'typeorm';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';

import Client from '../entities/Client';

class ClientsRepository implements IClientsRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  public async create({
    clientsWithoutException,
  }: ICreateClientDTO): Promise<Client> {
    const clientsData = this.ormRepository.create(clientsWithoutException);

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
}

export default ClientsRepository;
