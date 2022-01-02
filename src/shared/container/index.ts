import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ClientsRepository from '@modules/clients/infra/typeorm/repositories/ClientsRepository';

import IClientTokensRepository from '@modules/clients/repositories/IClientTokensRepository';
import ClientTokensRepository from '@modules/clients/infra/typeorm/repositories/ClientTokensRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRerpositories';

import ITasksRepository from '@modules/tasks/repositories/ITaskRepository';
import TasksRepository from '@modules/tasks/infra/typeorm/repositories/TasksRepositories';

import IUnsubscribesRepository from '@modules/unsubscribe/repositories/IUnsubscribesRepository';
import UnsubscribesRepository from '@modules/unsubscribe/infra/typeorm/repositories/UnsubscribesRepository';

import ILogsErrorRepository from '@modules/logs/repositories/ILogsErrorRepository';
import LogsErrorRepository from '@modules/logs/infra/typeorm/repositories/LogsErrorRepository';

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
);

container.registerSingleton<IClientTokensRepository>(
  'ClientTokensRepository',
  ClientTokensRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ITasksRepository>(
  'TasksRepository',
  TasksRepository,
);

container.registerSingleton<IUnsubscribesRepository>(
  'UnsubscribesRepository',
  UnsubscribesRepository,
);

container.registerSingleton<ILogsErrorRepository>(
  'LogsErrorRepository',
  LogsErrorRepository,
);
