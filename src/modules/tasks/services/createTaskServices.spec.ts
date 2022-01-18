import CreateTaskServices from './CreateTaskServices';
import { mockCreateTaskRepository } from '../mocks/mockDbTaskRepository';
import { ICreateTaskRepository } from '../repositories';

interface ISutTypes {
  sut: CreateTaskServices;
  createTaskStub: ICreateTaskRepository;
}

const makeSut = (): ISutTypes => {
  const createTaskStub = mockCreateTaskRepository();
  const sut = new CreateTaskServices(createTaskStub);
  return {
    sut,
    createTaskStub,
  };
};
describe('Create Task Service', () => {
  test('should call CreateTaskRepository with correct value', async () => {
    const { sut, createTaskStub } = makeSut();
    const createSpy = jest.spyOn(createTaskStub, 'create');
    await sut.execute({
      user_id: 'any_user_id',
      description: 'any_description',
      status: 'any_status',
    });
    expect(createSpy).toHaveBeenCalledWith({
      user_id: 'any_user_id',
      description: 'any_description',
      status: 'any_status',
    });
  });

  test('should return a new Task on success', async () => {
    const { sut } = makeSut();
    const response = await sut.execute({
      user_id: 'any_user_id',
      description: 'any_description',
      status: 'any_status',
    });
    expect(response).toEqual({
      id: 'any_id',
      user_id: 'any_user_id',
      description: 'any_description',
      status: 'any_status',
      created_at: new Date('11/11/2020'),
      updated_at: new Date('11/11/2020'),
    });
  });
});
