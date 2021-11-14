import { container } from 'tsyringe';

import './providers';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ClientsRepository from '@modules/clients/infra/typeorm/repositories/ClientsRepository';

import ILogsErrorRepository from '@modules/logs/repositories/ILogsErrorRepository';
import LogsErrorRepository from '@modules/logs/infra/typeorm/repositories/LogsErrorRepository';

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
);

container.registerSingleton<ILogsErrorRepository>(
  'LogsErrorRepository',
  LogsErrorRepository,
);
