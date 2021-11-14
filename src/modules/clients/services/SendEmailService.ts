import { injectable, inject } from 'tsyringe';
import path from 'path';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ILogsErrorRepository from '@modules/logs/repositories/ILogsErrorRepository';

interface IRequest {
  subject: string;
  linkImg: string;
  numberOfSends: string;
}

interface IClient {
  cod: string;
  email: string;
}

@injectable()
class SendEmailService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('LogsErrorRepository')
    private logsErrorRepository: ILogsErrorRepository,
  ) {}

  async handleSend(client: IClient, subject: string, linkImg: string) {
    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    try {
      await this.mailProvider.sendMail({
        to: {
          name: 'a',
          email: client.email,
        },
        subject,
        templateData: {
          file: forgotPasswordTemplate,
          variables: {
            linkImg,
          },
        },
      });
      await this.clientsRepository.updateStatusSended(client.cod, 'Y');
    } catch (error: any) {
      await this.logsErrorRepository.create(client.cod, error.message);
      await this.clientsRepository.updateStatusSended(client.cod, 'C');
    }
  }

  public async execute({
    subject,
    linkImg,
    numberOfSends,
  }: IRequest): Promise<void> {
    const clients = await this.clientsRepository.findAllClients(
      Number(numberOfSends),
    );

    /*  clients.map(client => {
      console.log(client);
    }); */
    /* clients.forEach(client => {
      this.handleSend(client, subject, linkImg);
    }); */

    await Promise.all(
      clients.map(async client => this.handleSend(client, subject, linkImg)),
    );

    // await this.handleSend(clients[0], subject, linkImg);
  }
}

export default SendEmailService;
