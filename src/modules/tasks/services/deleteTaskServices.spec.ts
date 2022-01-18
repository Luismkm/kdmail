import { mockDeleteTaskRepository } from '../mocks/mockDbTaskRepository';
import { IDeleteTaskRepository } from '../repositories';
import DeleteTaskServices from './DeleteTaskServices';

interface ISutTypes {
  sut: DeleteTaskServices;
  deleteTaskStub: IDeleteTaskRepository;
}

const makeSut = (): ISutTypes => {
  const deleteTaskStub = mockDeleteTaskRepository();
  const sut = new DeleteTaskServices(deleteTaskStub);
  return {
    sut,
    deleteTaskStub,
  };
};

describe('Delete Task Services', () => {
  test('should call DeleteTaskRepository wirh correct value', async () => {
    const { sut, deleteTaskStub } = makeSut();
    const deleteSpy = jest.spyOn(deleteTaskStub, 'delete');
    const response = await sut.execute('any_task_id');
    expect(deleteSpy).toHaveBeenCalledWith('any_task_id');
    expect(response).toBeUndefined();
  });
});
