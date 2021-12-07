import { injectable, inject } from 'tsyringe';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import IStatusDTO from '../dtos/IFindAllClientsGroupByStatusDTO';

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
