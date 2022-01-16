import ClientToken from '../../infra/typeorm/entities/ClientToken';

export default interface IClientTokensRepository {
  generate(client_cod: string, email: string): Promise<ClientToken>;
  findTokenByCod(cod: string): Promise<ClientToken>;
  find(token: string): Promise<ClientToken>;
}
