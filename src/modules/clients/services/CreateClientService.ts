import { inject, injectable } from 'tsyringe';
import { IFindAllUnsubscribeRepository } from '@modules/unsubscribe/repositories/IFindAllUnsubscribeRepository';
import IClientsRepository from '../repositories/Client/IClientsRepository';

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
    private unsubscribesRepository: IFindAllUnsubscribeRepository,
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
