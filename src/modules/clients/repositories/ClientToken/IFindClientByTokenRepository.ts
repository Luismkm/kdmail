import ClientToken from '../../infra/typeorm/entities/ClientToken';

export interface IFindClientByTokenRepository {
  find(token: string): Promise<ClientToken>;
}
