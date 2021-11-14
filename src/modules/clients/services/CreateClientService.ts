import { inject, injectable } from 'tsyringe';
import Client from '../infra/typeorm/entities/Client';
import IClientsRepository from '../repositories/IClientsRepository';

interface IData {
  cod: string;
  email: string;
}

interface IRequest {
  clients: IData[];
}

@injectable()
class CreateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(clients: IRequest): Promise<Client> {
    // console.log(clients);
    await this.clientsRepository.create(clients);

    /* const client = await this.clientsRepository.create({
      cod,
      email,
    }); */

    return null;
  }
}

export default CreateClientService;
