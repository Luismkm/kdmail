import { IFindClientByTokenRepository } from '@modules/clients/repositories/ClientToken/IFindClientByTokenRepository';
import CreateUnsubscribeService from './CreateUnsubscribeService';
import { ICreateUnsubscribeRepository } from '../repositories/ICreateUnsubscribeRepository';
import {
  mockCreateUnsubscribeRepository,
  mockFindClientByTokenRepository,
} from '../mocks/mockDbUnsubscribeService';

interface ISutTypes {
  sut: CreateUnsubscribeService;
  findClientByTokenStub: IFindClientByTokenRepository;
  createUnsubscribeStub: ICreateUnsubscribeRepository;
}

const makeSut = (): ISutTypes => {
  const findClientByTokenStub = mockFindClientByTokenRepository();
  const createUnsubscribeStub = mockCreateUnsubscribeRepository();
  const sut = new CreateUnsubscribeService(
    findClientByTokenStub,
    createUnsubscribeStub,
  );

  return {
    sut,
    findClientByTokenStub,
    createUnsubscribeStub,
  };
};

describe('Create Unsubscribe Service', () => {
  test('should call FindClientByTokenRepository with correct token', async () => {
    const { sut, findClientByTokenStub } = makeSut();
    const findSpy = jest.spyOn(findClientByTokenStub, 'find');
    await sut.execute('any_token');
    expect(findSpy).toHaveBeenCalledWith('any_token');
  });

  test('should return null if FindClientByTokenRepository not returns a ClientToken', async () => {
    const { sut, findClientByTokenStub } = makeSut();
    jest
      .spyOn(findClientByTokenStub, 'find')
      .mockReturnValue(Promise.resolve(null));
    const response = await sut.execute('any_token');
    expect(response).toBe(null);
  });

  test('should call CreateUnsubscribeRepository with correct values', async () => {
    const { sut, createUnsubscribeStub } = makeSut();
    const createSpy = jest.spyOn(createUnsubscribeStub, 'create');
    await sut.execute('any_token');
    expect(createSpy).toHaveBeenCalledWith('any_client_cod', 'any_email');
  });

  test('should return a new Unsubscribe on success', async () => {
    const { sut } = makeSut();
    const response = await sut.execute('any_token');
    expect(response).toEqual({
      cod: 'any_cod',
      email: 'any_email',
      created_at: new Date('11/11/2020'),
    });
  });
});
