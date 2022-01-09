import { getRepository, Repository } from 'typeorm';

import IClientTokensRepository from '@modules/clients/repositories/IClientTokensRepository';

import ClientToken from '../entities/ClientToken';

class ClientTokensRepository implements IClientTokensRepository {
  private ormRepository: Repository<ClientToken>;

  constructor() {
    this.ormRepository = getRepository(ClientToken);
  }

  public async findTokenByCod(
    client_cod: string,
  ): Promise<ClientToken | undefined> {
    const clientToken = await this.ormRepository.findOne({
      where: { client_cod },
    });
    return clientToken;
  }

  public async findToken(token: string): Promise<ClientToken | undefined> {
    const clientToken = await this.ormRepository.findOne({
      where: { token },
    });
    return clientToken;
  }

  public async generate(
    client_cod: string,
    email: string,
  ): Promise<ClientToken> {
    const clientToken = this.ormRepository.create({
      client_cod,
      email,
    });

    await this.ormRepository.save(clientToken);

    return clientToken;
  }
}

export default ClientTokensRepository;