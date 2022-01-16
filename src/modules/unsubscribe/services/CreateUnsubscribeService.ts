import { inject, injectable } from 'tsyringe';
import { IFindClientByTokenRepository } from '@modules/clients/repositories/ClientToken/IFindClientByTokenRepository';
import { ICreateUnsubscribeRepository } from '../repositories/ICreateUnsubscribeRepository';
import Unsubscribe from '../infra/typeorm/entities/Unsubscribe';

@injectable()
class CreateUnsubscribeService {
  constructor(
    @inject('ClientTokensRepository')
    private findClientByTokenRepository: IFindClientByTokenRepository,

    @inject('UnsubscribesRepository')
    private createUnsubscribeRepository: ICreateUnsubscribeRepository,
  ) {}

  public async execute(token: string): Promise<Unsubscribe> {
    const client = await this.findClientByTokenRepository.find(token);
    if (client) {
      const unsubscribe = await this.createUnsubscribeRepository.create(
        client.client_cod,
        client.email,
      );
      return unsubscribe;
    }
    return null;
  }
}

export default CreateUnsubscribeService;
