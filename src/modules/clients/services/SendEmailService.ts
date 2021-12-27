import { injectable, inject } from 'tsyringe';
import path from 'path';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ILogsErrorRepository from '@modules/logs/repositories/ILogsErrorRepository';
import { CronJob } from 'cron';
import { io } from '@shared/infra/http/app';

interface IRequest {
  emailSubject: string;
  linkImgBanner: string;
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
    const clientData = {
      cod: client.cod,
      email: client.email,
    };
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
      Object.assign(clientData, { status: 'Sucesso' });
      io.emit('new_client', clientData);
    } catch (error: any) {
      await this.logsErrorRepository.create(client.cod, error.message);
      await this.clientsRepository.updateStatusSended(client.cod, 'C');
      Object.assign(clientData, { status: 'Erro' });
      io.emit('new_client', clientData);
    }
  }

  public async execute({
    emailSubject,
    linkImgBanner,
    numberOfSends,
  }: IRequest): Promise<void> {
    const clients = await this.clientsRepository.findAllClients(
      Number(numberOfSends),
    );
    let inicial = 0;
    const final = clients.length - 1;

    const jobNight = new CronJob(
      '*/5 54 13 * * *',
      async () => {
        if (inicial > final) {
          jobNight.stop();
        } else {
          await this.handleSend(clients[inicial], emailSubject, linkImgBanner);
          inicial += 1;
        }
      },
      null,
      true,
      'America/Sao_Paulo',
    );

    const jobDay = new CronJob(
      '*/5 12 10 * * *',
      async () => {
        if (inicial > final) {
          jobDay.stop();
        } else {
          await this.handleSend(clients[inicial], emailSubject, linkImgBanner);
          inicial += 1;
        }
      },
      null,
      true,
      'America/Sao_Paulo',
    );
    jobNight.start();
    jobDay.start();
  }
}

export default SendEmailService;
