import ClientToken from '@modules/clients/infra/typeorm/entities/ClientToken';
import { IFindClientByTokenRepository } from '@modules/clients/repositories/ClientToken/IFindClientByTokenRepository';
import Unsubscribe from '../infra/typeorm/entities/Unsubscribe';
import { ICreateUnsubscribeRepository } from '../repositories/ICreateUnsubscribeRepository';

export const mockFindClientByTokenRepository =
  (): IFindClientByTokenRepository => {
    class FindClientByTokenStub implements IFindClientByTokenRepository {
      async find(token: string): Promise<ClientToken> {
        return Promise.resolve({
          id: 'any_id',
          token: 'any_token',
          client_cod: 'any_client_cod',
          email: 'any_email',
          created_at: new Date('11/11/2020'),
          updated_at: new Date('11/11/2020'),
        });
      }
    }
    return new FindClientByTokenStub();
  };

export const mockCreateUnsubscribeRepository =
  (): ICreateUnsubscribeRepository => {
    class CreateUnsubscribeRepositoryStub
      implements ICreateUnsubscribeRepository
    {
      async create(cod: string, email: string): Promise<Unsubscribe> {
        return Promise.resolve({
          cod: 'any_cod',
          email: 'any_email',
          created_at: new Date('11/11/2020'),
        });
      }
    }
    return new CreateUnsubscribeRepositoryStub();
  };
