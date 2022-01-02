import IUnsubscribesRepository from '@modules/unsubscribe/repositories/IUnsubscribesRepository';
import { inject, injectable } from 'tsyringe';
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

    @inject('UnsubscribesRepository')
    private unsubscribesRepository: IUnsubscribesRepository,
  ) {}

  public async execute({ clients }: IRequest): Promise<number> {
    const unsubscribeList =
      await this.unsubscribesRepository.findAllUnsubscribe();
    const clientsWithoutUnsubscribe = [].concat(
      clients.filter(val =>
        unsubscribeList.every(val2 => val.email !== val2.email),
      ),
    );

    await this.clientsRepository.create({ clientsWithoutUnsubscribe });

    return clientsWithoutUnsubscribe.length;
  }
}

export default CreateClientService;
