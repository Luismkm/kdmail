import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendEmailService from '@modules/clients/services/SendEmailService';
import StatusEmailService from '@modules/clients/services/StatusEmailService';
import DeleteClientListService from '@modules/clients/services/DeleteClientListService';

export default class SendEmailController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { emailSubject, linkImgBanner, numberOfSends } = request.body;

    const sendEmail = container.resolve(SendEmailService);

    await sendEmail.execute({
      emailSubject,
      linkImgBanner,
      numberOfSends,
    });

    return response.status(204).json();
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const statusEmail = container.resolve(StatusEmailService);

    const status = await statusEmail.execute();

    return response.status(200).json({ status });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const clearList = container.resolve(DeleteClientListService);

    await clearList.execute();

    return response.status(204).json();
  }
}
