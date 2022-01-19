import UpdateDescriptionTaskService from './UpdateDescriptionTaskService';
import { IUpdateTaskDescriptionRepository } from '../repositories';
import { mockUpdateTaskDescriptionRepository } from '../mocks/mockDbTaskRepository';

interface ISutTypes {
  updateDescriptionStub: IUpdateTaskDescriptionRepository;
  sut: UpdateDescriptionTaskService;
}

const makeSut = (): ISutTypes => {
  const updateDescriptionStub = mockUpdateTaskDescriptionRepository();
  const sut = new UpdateDescriptionTaskService(updateDescriptionStub);
  return {
    sut,
    updateDescriptionStub,
  };
};

describe('Update Description Task Service', () => {
  test('should call UpdateDescriptionTaskService with correct values', async () => {
    const { sut, updateDescriptionStub } = makeSut();
    const updateStub = jest.spyOn(updateDescriptionStub, 'updateDescription');
    const response = await sut.execute('any_id', 'any_description');
    expect(updateStub).toHaveBeenCalledWith('any_id', 'any_description');
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
