import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';

import { IHashGenerate } from '../providers/HashProvider/models/IHashGenerate';
import { ILoadUserByNameRepository } from '../repositories/ILoadUserByNameRepository';

import { mockHashGenerate } from '../mocks/mockCryptography';
import {
  mockCreateUserRepository,
  mockLoadUserByNameRepository,
} from '../mocks/mockDbUser';
import { ICreateUserRepository } from '../repositories/ICreateUserRepository';

interface ISutTypes {
  sut: CreateUserService;
  loadUserStub: ILoadUserByNameRepository;
  hashGenerateStub: IHashGenerate;
  createUserStub: ICreateUserRepository;
}

const makeSut = (): ISutTypes => {
  const loadUserStub = mockLoadUserByNameRepository();
  const hashGenerateStub = mockHashGenerate();
  const createUserStub = mockCreateUserRepository();
  const sut = new CreateUserService(
    loadUserStub,
    createUserStub,
    hashGenerateStub,
  );
  return {
    sut,
    loadUserStub,
    hashGenerateStub,
    createUserStub,
  };
};
describe('Create User Service', () => {
  test('should return AppError if LoadUser retuns a User', async () => {
    const { sut } = makeSut();
    const response = sut.execute({
      name: 'any_name',
      password: 'any_password',
      role: 'any_role',
    });
    await expect(response).rejects.toBeInstanceOf(AppError);
  });

  test('should call LoadUser with correct value', async () => {
    const { sut, loadUserStub } = makeSut();
    jest.spyOn(loadUserStub, 'load').mockReturnValue(Promise.resolve(null));
    const loadSpy = jest.spyOn(loadUserStub, 'load');
    await sut.execute({
      name: 'any_name',
      password: 'any_password',
      role: 'any_role',
    });
    expect(loadSpy).toHaveBeenCalledWith('any_name');
  });

  test('should call HashGenerate with correct value', async () => {
    const { sut, loadUserStub, hashGenerateStub } = makeSut();
    jest.spyOn(loadUserStub, 'load').mockReturnValue(Promise.resolve(null));
    const hashSpy = jest.spyOn(hashGenerateStub, 'hashGenerate');
    await sut.execute({
      name: 'any_name',
      password: 'any_password',
      role: 'any_role',
    });
    expect(hashSpy).toHaveBeenCalledWith('any_password');
  });
  test('should call CreateUserRepository with correct value', async () => {
    const { sut, loadUserStub, createUserStub } = makeSut();
    jest.spyOn(loadUserStub, 'load').mockReturnValue(Promise.resolve(null));
    const createSpy = jest.spyOn(createUserStub, 'create');
    await sut.execute({
      name: 'any_name',
      password: 'any_password',
      role: 'any_role',
    });
    expect(createSpy).toHaveBeenCalledWith({
      name: 'any_name',
      password: 'hashed_token',
      role: 'any_role',
    });
  });

  test('should return an new user', async () => {
    const { sut, loadUserStub } = makeSut();
    jest.spyOn(loadUserStub, 'load').mockReturnValue(Promise.resolve(null));
    const response = await sut.execute({
      name: 'any_name',
      password: 'any_password',
      role: 'any_role',
    });
    expect(response).toEqual({
      id: 'any_id',
      name: 'any_name',
      password: 'hashed_password',
      role: 'any_role',
      created_at: new Date('11/11/2020'),
      updated_at: new Date('11/11/2020'),
    });
  });
});
