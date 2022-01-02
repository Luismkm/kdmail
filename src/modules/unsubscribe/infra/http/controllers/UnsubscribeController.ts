import CreateUnsubscribeService from '@modules/unsubscribe/services/CreateUnsubscribeService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UnsubscribeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token } = request.params;

    const unsubscribe = container.resolve(CreateUnsubscribeService);

    await unsubscribe.execute(token);

    return response.status(204).json();
  }
}
