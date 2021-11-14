import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { Readable } from 'stream';
import readline from 'readline';

import SendEmailService from '@modules/clients/services/SendEmailService';

/* interface Client {
  cod: string;
  cnpj: string;
  email: string;
  situation: string;
} */

export default class SendEmailController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { subject, linkImg, numberOfSends } = request.body;

    const sendEmail = container.resolve(SendEmailService);

    await sendEmail.execute({
      subject,
      linkImg,
      numberOfSends,
    });

    return response.status(204).json();
  }
}
