import AppError from '@shared/errors/AppError';
import jwt from 'jsonwebtoken';
import { mockHashCompare } from '../mocks/mockCryptography';
import { mockLoadUserByNameRepository } from '../mocks/mockDbUser';
import { IHashCompare } from '../providers/HashProvider/models/IHashCompare';
import { ILoadUserByNameRepository } from '../repositories/ILoadUserByNameRepository';
import { AuthenticateUserService } from './AuthenticateUserService';

jest.mock('jsonwebtoken', () => ({
  sign(): string {
    return 'any_token';
  },
}));

interface ISutTypes {
  sut: AuthenticateUserService;
  loadUserStub: ILoadUserByNameRepository;
  hashCompareStub: IHashCompare;
}

const makeSut = (): ISutTypes => {
  const loadUserStub = mockLoadUserByNameRepository();
  const hashCompareStub = mockHashCompare();
  const sut = new AuthenticateUserService(loadUserStub, hashCompareStub);
  return {
    sut,
    loadUserStub,
    hashCompareStub,
  };
};

describe('Authenticate User Service', () => {
  test('should call LoadUser with correct value', async () => {
    const { sut, loadUserStub } = makeSut();
    const loadSpy = jest.spyOn(loadUserStub, 'load');
    await sut.execute({ name: 'any_name', password: 'any_password' });
    expect(loadSpy).toHaveBeenCalledWith('any_name');
  });

  test('should return AppError if LoadUser returns null', async () => {
    const { sut, loadUserStub } = makeSut();
    jest.spyOn(loadUserStub, 'load').mockReturnValueOnce(Promise.resolve(null));
    const response = sut.execute({
      name: 'any_name',
      password: 'any_password',
    });
    await expect(response).rejects.toBeInstanceOf(AppError);
  });

  test('Should call HashCompare with correct values', async () => {
    const { sut, hashCompareStub } = makeSut();
    const compareSpy = jest.spyOn(hashCompareStub, 'hashCompare');
    await sut.execute({ name: 'any_name', password: 'any_password' });
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password');
  });

  test('Should return AppError if HashCompare returns false', async () => {
    const { sut, hashCompareStub } = makeSut();
    jest
      .spyOn(hashCompareStub, 'hashCompare')
      .mockReturnValueOnce(Promise.resolve(false));
    const response = sut.execute({
      name: 'any_name',
      password: 'any_password',
    });
    await expect(response).rejects.toBeInstanceOf(AppError);
  });

  test('seila', async () => {
    const { sut } = makeSut();
    const response = await sut.execute({
      name: 'any_name',
      password: 'any_password',
    });
    expect(response).toEqual({
      user: {
        id: 'any_id',
        name: 'any_name',
        password: 'hashed_password',
        role: 'any_role',
        created_at: new Date('11/11/2020'),
        updated_at: new Date('11/11/2020'),
      },
      token: 'any_token',
    });
  });
});
