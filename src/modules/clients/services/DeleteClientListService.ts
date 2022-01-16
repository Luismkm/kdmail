import { injectable, inject } from 'tsyringe';
import IClientsRepository from '../repositories/Client/IClientsRepository';

@injectable()
class DeleteClientListService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(): Promise<void> {
    await this.clientsRepository.deleteAllClients();
  }
}

export default DeleteClientListService;
