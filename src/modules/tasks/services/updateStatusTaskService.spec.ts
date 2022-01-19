import UpdateStatusTaskService from './UpdateStatusTaskService';
import { mockUpdateTaskStatusRepository } from '../mocks/mockDbTaskRepository';
import { IUpdateTaskStatusRepository } from '../repositories';

interface ISutTypes {
  updateStatusStub: IUpdateTaskStatusRepository;
  sut: UpdateStatusTaskService;
}

const makeSut = (): ISutTypes => {
  const updateStatusStub = mockUpdateTaskStatusRepository();
  const sut = new UpdateStatusTaskService(updateStatusStub);
  return {
    updateStatusStub,
    sut,
  };
};

describe('Update Status Task Service', () => {
  test('should call UpdateStatusTaskService with correct values', async () => {
    const { sut, updateStatusStub } = makeSut();
    const updateSpy = jest.spyOn(updateStatusStub, 'updateStatus');
    const response = await sut.execute('any_task_id', 'any_status');
    expect(updateSpy).toHaveBeenCalledWith('any_task_id', 'any_status');
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
