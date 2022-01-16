import { container } from 'tsyringe';

import BCriptHashProvider from './HashProvider/implementations/BCriptHashProvider';
import { IHashProviderInject } from './HashProvider/models/IHashProviderInject';

container.registerSingleton<IHashProviderInject>(
  'HashProvider',
  BCriptHashProvider,
);
