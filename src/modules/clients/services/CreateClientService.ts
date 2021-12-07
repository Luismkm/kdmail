import IClientsExceptionRepository from '@modules/clientsException/repositories/IClientsExceptionRepository';
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

    @inject('ClientsExceptionRepository')
    private clientsExceptionRepository: IClientsExceptionRepository,
  ) {}

  public async execute({ clients }: IRequest): Promise<number> {
    const clientsExceptionList =
      await this.clientsExceptionRepository.findAllClientsException();

    const clientsWithoutException = [].concat(
      clients.filter(val =>
        clientsExceptionList.every(val2 => val.email !== val2.email),
      ),
    );

    await this.clientsRepository.create({ clientsWithoutException });

    return clientsWithoutException.length;
  }
}

export default CreateClientService;
