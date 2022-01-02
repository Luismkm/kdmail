import { getRepository, Repository } from 'typeorm';

import IUnsubscribesRepository from '@modules/unsubscribe/repositories/IUnsubscribesRepository';
import Unsubscribe from '../entities/Unsubscribe';

class UnsubscribesRepository implements IUnsubscribesRepository {
  private ormRepository: Repository<Unsubscribe>;

  constructor() {
    this.ormRepository = getRepository(Unsubscribe);
  }

  async create(cod: string, email: string): Promise<void> {
    const unsubscribe = this.ormRepository.create({ cod, email });
    await this.ormRepository.save(unsubscribe);
  }

  async findAllUnsubscribe(): Promise<Unsubscribe[]> {
    const unsubscribe = await this.ormRepository.find();
    return unsubscribe;
  }
}

export default UnsubscribesRepository;
