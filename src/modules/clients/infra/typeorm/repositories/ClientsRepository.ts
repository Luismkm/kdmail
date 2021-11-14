import { getRepository, Repository, Not } from 'typeorm';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';

import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';

import Client from '../entities/Client';

class ClientsRepository implements IClientsRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  public async create({ clients }: ICreateClientDTO): Promise<Client> {
    const clientsData = this.ormRepository.create(clients);

    await this.ormRepository.save(clientsData);
    // console.log(userData);
    // console.log(clients[0]);

    return null;
  }

  public async findAllClients(numberOfSends: number): Promise<Client[]> {
    const clients = await this.ormRepository.find({ take: numberOfSends });
    return clients;
  }

  public async updateStatusSended(cod: string): Promise<void> {
    await this.ormRepository.save({
      cod,
      sended: 'Y',
    });
  }
}

export default ClientsRepository;
