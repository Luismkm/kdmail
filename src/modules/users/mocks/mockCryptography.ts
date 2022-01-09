import { IHashCompare } from '../providers/HashProvider/models/IHashCompare';

export const mockHashCompare = (): IHashCompare => {
  class HashCompareStub implements IHashCompare {
    async hashCompare(paylaod: string, hashed: string): Promise<boolean> {
      return Promise.resolve(true);
    }
  }
  return new HashCompareStub();
};
