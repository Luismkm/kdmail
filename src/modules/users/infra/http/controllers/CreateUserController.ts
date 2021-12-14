import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class CreateUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, password, role } = request.body;
    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({ name, password, role });

    return response.status(200).json({ user });
  }
}
