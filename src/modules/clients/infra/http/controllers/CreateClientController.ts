import { Request, Response } from 'express';
import { Readable } from 'stream';
import readline from 'readline';
import { container } from 'tsyringe';
import CreateClientService from '@modules/clients/services/CreateClientService';

interface IClient {
  cod: string;
  email: string;
}

export default class CreateClientController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { file } = request;
    const { buffer } = file;

    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);

    const clients = readline.createInterface({
      input: readableFile,
    });

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    const createClientService = container.resolve(CreateClientService);

    const clientsWithValidEmail: IClient[] = [];

    for await (const line of clients) {
      const clientSplit = line.split(';');

      const cod = clientSplit[0];
      const CNPJ = clientSplit[4];
      const email = clientSplit[5];
      const clientSituation = clientSplit[6];

      if (CNPJ !== '' && clientSituation === 'A' && email !== '') {
        const emailWithoutSpaces = email.replace(/ /g, '');

        const isValidEmail = emailRegex.test(emailWithoutSpaces);

        if (isValidEmail) {
          clientsWithValidEmail.push({
            cod,
            email: emailWithoutSpaces,
          });
        }
      }
    }

    await createClientService.execute({ clients: clientsWithValidEmail });

    return response.status(204).json();
  }
}
