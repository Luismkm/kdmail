import FindAllOpenTaskServices from './FindAllOpenTaskServices';
import { IFindAllOpenTaskRepository } from '../repositories';
import { mockFindAllOpenTaskRepository } from '../mocks/mockDbTaskRepository';

interface ISutTypes {
  sut: FindAllOpenTaskServices;
  findAllOpenTaskStub: IFindAllOpenTaskRepository;
}

const makeSut = (): ISutTypes => {
  const findAllOpenTaskStub = mockFindAllOpenTaskRepository();
  const sut = new FindAllOpenTaskServices(findAllOpenTaskStub);
  return {
    sut,
    findAllOpenTaskStub,
  };
};

describe('Show Tasks Services', () => {
  test('should call FindAllOpenTaskRepository with correct values', async () => {
    const { sut, findAllOpenTaskStub } = makeSut();
    const findSpy = jest.spyOn(findAllOpenTaskStub, 'findAllOpenTask');
    const response = await sut.execute();
    expect(findSpy).toHaveBeenCalled();
    expect(response).toBeTruthy();
  });
});
