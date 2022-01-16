import ClientToken from '../infra/typeorm/entities/ClientToken';

export const mockClientToken = (): ClientToken => ({
  id: 'any_id',
  client_cod: 'any_cod',
  token: 'any_token',
  email: 'any_email',
  created_at: new Date('11/11/2020'),
  updated_at: new Date('11/11/2020'),
});
