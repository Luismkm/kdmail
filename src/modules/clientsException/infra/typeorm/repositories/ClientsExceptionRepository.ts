import { getRepository, Repository } from 'typeorm';

import IClientsExceptionRepository from '@modules/clientsException/repositories/IClientsExceptionRepository';
import ClientException from '../entities/ClientException';

class ClientsExceptionRepository implements IClientsExceptionRepository {
  private ormRepository: Repository<ClientException>;

  constructor() {
    this.ormRepository = getRepository(ClientException);
  }

  async findAllClientsException(): Promise<ClientException[]> {
    const clientsException = await this.ormRepository.find();
    return clientsException;
  }
}

export default ClientsExceptionRepository;
