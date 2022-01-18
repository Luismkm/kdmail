import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IClientsRepository from '@modules/clients/repositories/Client/IClientsRepository';
import ClientsRepository from '@modules/clients/infra/typeorm/repositories/ClientsRepository';

import IClientTokensRepository from '@modules/clients/repositories/ClientToken/IClientTokensRepository';
import ClientTokensRepository from '@modules/clients/infra/typeorm/repositories/ClientTokensRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepositoryInject';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRerpository';

import ITasksRepositoryInject from '@modules/tasks/repositories/ITaskRepositoryInject';
import TasksRepository from '@modules/tasks/infra/typeorm/repositories/TasksRepositories';

import IUnsubscribesRepository from '@modules/unsubscribe/repositories/IUnsubscribeRepositoryInject';
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

container.registerSingleton<ITasksRepositoryInject>(
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
