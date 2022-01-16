import { injectable, inject } from 'tsyringe';

import IStatusDTO from '../dtos/IFindAllClientsGroupByStatusDTO';
import IClientsRepository from '../repositories/Client/IClientsRepository';

@injectable()
class StatusEmailService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(): Promise<IStatusDTO[]> {
    const status = await this.clientsRepository.findAllClientsGroupByStatus();

    return status;
  }
}

export default StatusEmailService;
