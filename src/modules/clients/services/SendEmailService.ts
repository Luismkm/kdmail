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
    const emailTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'email_template.hbs',
    );

    try {
      await this.mailProvider.sendMail({
        to: {
          email: client.email,
        },
        subject,
        templateData: {
          file: emailTemplate,
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

    await Promise.all(
      clients.map(client => this.handleSend(client, subject, linkImg)),
    );
  }
}

export default SendEmailService;
