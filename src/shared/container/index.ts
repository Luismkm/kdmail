import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ClientsRepository from '@modules/clients/infra/typeorm/repositories/ClientsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRerpositories';

import IClientsExceptionRepository from '@modules/clientsException/repositories/IClientsExceptionRepository';
import ClientsExceptionRepository from '@modules/clientsException/infra/typeorm/repositories/ClientsExceptionRepository';

import ILogsErrorRepository from '@modules/logs/repositories/ILogsErrorRepository';
import LogsErrorRepository from '@modules/logs/infra/typeorm/repositories/LogsErrorRepository';

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IClientsExceptionRepository>(
  'ClientsExceptionRepository',
  ClientsExceptionRepository,
);

container.registerSingleton<ILogsErrorRepository>(
  'LogsErrorRepository',
  LogsErrorRepository,
);
