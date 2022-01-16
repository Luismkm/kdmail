import ClientToken from '../infra/typeorm/entities/ClientToken';
import { IFindClientByTokenRepository } from '../repositories/ClientToken/IFindClientByTokenRepository';
import { mockClientToken } from './mockClientToken';

export const mockFindClientByTokensRepository =
  (): IFindClientByTokenRepository => {
    class FindClientByTokensRepositoryStub
      implements IFindClientByTokenRepository
    {
      async find(token: string): Promise<ClientToken> {
        return Promise.resolve(mockClientToken());
      }
    }
    return new FindClientByTokensRepositoryStub();
  };
