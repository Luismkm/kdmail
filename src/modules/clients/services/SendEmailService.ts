import path from 'path';
import { injectable, inject } from 'tsyringe';
import { CronJob } from 'cron';

import { io } from '@shared/infra/http/app';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ILogsErrorRepository from '@modules/logs/repositories/ILogsErrorRepository';
import IClientsRepository from '../repositories/Client/IClientsRepository';
import IClientTokensRepository from '../repositories/ClientToken/IClientTokensRepository';

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

    @inject('ClientTokensRepository')
    private clientTokensRepository: IClientTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('LogsErrorRepository')
    private logsErrorRepository: ILogsErrorRepository,
  ) {}

  async handleSend(
    client: IClient,
    subject: string,
    linkImg: string,
    token: string,
  ) {
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
            linkUnsubscribe: `${process.env.APP_WEB_URL}/unsubscribe?token=${token}`,
          },
        },
      });
      await this.clientsRepository.updateStatusSended(client.cod, 'Y');
      Object.assign(clientData, { status: 'Sucesso' });
      io.emit('new_client', clientData);
    } catch (error: any) {
      await this.logsErrorRepository.create(
        client.cod,
        error.message,
        client.email,
      );
      await this.clientsRepository.updateStatusSended(client.cod, 'C');
      Object.assign(clientData, { status: 'Erro' });
      io.emit('new_client', clientData);
    }
  }

  public async execute({
    emailSubject,
    linkImgBanner,
  }: IRequest): Promise<void> {
    const clients = await this.clientsRepository.findAllClients();

    let currentPositionQueue = 0;
    const lastPositionQueue = clients.length - 1;

    const jobNight = new CronJob(
      '*/5 58 12 * * *',
      async () => {
        if (currentPositionQueue > lastPositionQueue) {
          jobNight.stop();
        } else {
          let clientToken = await this.clientTokensRepository.findTokenByCod(
            clients[currentPositionQueue].cod,
          );

          if (!clientToken) {
            clientToken = await this.clientTokensRepository.generate(
              clients[currentPositionQueue].cod,
              clients[currentPositionQueue].email,
            );
          }

          const { token } = clientToken;

          await this.handleSend(
            clients[currentPositionQueue],
            emailSubject,
            linkImgBanner,
            token,
          );
          currentPositionQueue += 1;
        }
      },
      null,
      true,
      'America/Sao_Paulo',
    );

    const jobDay = new CronJob(
      '*/5 * 21-23 * * *',
      async () => {
        if (currentPositionQueue > lastPositionQueue) {
          jobDay.stop();
        } else {
          let clientToken = await this.clientTokensRepository.findTokenByCod(
            clients[currentPositionQueue].cod,
          );

          if (!clientToken) {
            clientToken = await this.clientTokensRepository.generate(
              clients[currentPositionQueue].cod,
              clients[currentPositionQueue].email,
            );
          }

          const { token } = clientToken;

          await this.handleSend(
            clients[currentPositionQueue],
            emailSubject,
            linkImgBanner,
            token,
          );
          currentPositionQueue += 1;
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
