import { inject, injectable } from 'tsyringe';
import IClientTokensRepository from '@modules/clients/repositories/IClientTokensRepository';
import IUnsubscribesRepository from '../repositories/IUnsubscribesRepository';

@injectable()
class CreateUnsubscribeService {
  constructor(
    @inject('UnsubscribesRepository')
    private unsubscribesRepository: IUnsubscribesRepository,

    @inject('ClientTokensRepository')
    private clientTokensRepository: IClientTokensRepository,
  ) {}

  public async execute(token: string): Promise<void> {
    const client = await this.clientTokensRepository.findToken(token);
    if (client) {
      await this.unsubscribesRepository.create(client.client_cod, client.email);
    }
  }
}

export default CreateUnsubscribeService;
