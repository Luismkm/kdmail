import ClientToken from '../infra/typeorm/entities/ClientToken';

export default interface IUserTokensRepository {
  generate(client_cod: string, email: string): Promise<ClientToken>;
  findTokenByCod(cod: string): Promise<ClientToken | undefined>;
  findToken(token: string): Promise<ClientToken | undefined>;
}
