import { IHashCompare } from '../providers/HashProvider/models/IHashCompare';
import { IHashGenerate } from '../providers/HashProvider/models/IHashGenerate';

export const mockHashCompare = (): IHashCompare => {
  class HashCompareStub implements IHashCompare {
    async hashCompare(paylaod: string, hashed: string): Promise<boolean> {
      return Promise.resolve(true);
    }
  }
  return new HashCompareStub();
};

export const mockHashGenerate = (): IHashGenerate => {
  class HashGenerateStub implements IHashGenerate {
    async hashGenerate(payload: string): Promise<string> {
      return Promise.resolve('hashed_token');
    }
  }
  return new HashGenerateStub();
};
