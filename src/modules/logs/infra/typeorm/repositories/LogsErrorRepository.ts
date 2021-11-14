import { getRepository, Repository } from 'typeorm';

import ILogsErrorRepository from '@modules/logs/repositories/ILogsErrorRepository';
import LogError from '../entities/LogError';

class LogsErrorRepository implements ILogsErrorRepository {
  private ormRepository: Repository<LogError>;

  constructor() {
    this.ormRepository = getRepository(LogError);
  }

  public async create(cod: string, error: string): Promise<void> {
    const logError = this.ormRepository.create({ cod, error });

    await this.ormRepository.save(logError);

    return null;
  }
}

export default LogsErrorRepository;
