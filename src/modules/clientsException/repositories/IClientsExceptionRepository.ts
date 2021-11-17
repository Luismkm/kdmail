import ClientException from '../infra/typeorm/entities/ClientException';

export default interface IClientsExceptionRepository {
  findAllClientsException(): Promise<ClientException[]>;
}
