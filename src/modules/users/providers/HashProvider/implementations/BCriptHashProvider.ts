import { hash, compare } from 'bcryptjs';
import { IHashCompare } from '../models/IHashCompare';
import { IHashGenerate } from '../models/IHashGenerate';

export default class BCriptHashProvider implements IHashCompare, IHashGenerate {
  public async hashGenerate(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async hashCompare(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
