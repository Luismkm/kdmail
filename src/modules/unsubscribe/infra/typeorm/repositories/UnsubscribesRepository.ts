import { getRepository, Repository } from 'typeorm';

import { ICreateUnsubscribeRepository } from '@modules/unsubscribe/repositories/ICreateUnsubscribeRepository';
import { IFindAllUnsubscribeRepository } from '@modules/unsubscribe/repositories/IFindAllUnsubscribeRepository';

import Unsubscribe from '../entities/Unsubscribe';

class UnsubscribeRepository
  implements ICreateUnsubscribeRepository, IFindAllUnsubscribeRepository
{
  private ormRepository: Repository<Unsubscribe>;

  constructor() {
    this.ormRepository = getRepository(Unsubscribe);
  }

  async create(cod: string, email: string): Promise<Unsubscribe> {
    const unsubscribeData = this.ormRepository.create({ cod, email });
    const unsubscribe = await this.ormRepository.save(unsubscribeData);
    return unsubscribe;
  }

  async findAllUnsubscribe(): Promise<Unsubscribe[]> {
    const unsubscribe = await this.ormRepository.find();
    return unsubscribe;
  }
}

export default UnsubscribeRepository;
