import CreateUnsubscribeService from '@modules/unsubscribe/services/CreateUnsubscribeService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UnsubscribeController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { token } = request.params;
      const unsubscribeService = container.resolve(CreateUnsubscribeService);
      const unsubscribe = await unsubscribeService.execute(token);
      if (unsubscribe) {
        return response.status(204).json();
      }
      return response.status(401).json({ message: 'Token inválido' });
    } catch (error) {
      return response.status(500).json({ message: 'Ocorreu um erro interno' });
    }
  }
}
