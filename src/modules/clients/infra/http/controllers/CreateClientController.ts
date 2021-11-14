import { Request, Response } from 'express';
import { Readable } from 'stream';
import readline from 'readline';
import { container } from 'tsyringe';
import CreateClientService from '@modules/clients/services/CreateClientService';

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

    const clientsWithValidEmail = [];
    const errarr = [];

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
        } else {
          errarr.push(emailWithoutSpaces);
        }
      }
    }

    await createClientService.execute({ clients: clientsWithValidEmail });
    // console.log(newarr);
    // console.log(errarr.filter(Boolean));

    return response.status(204).json();
  }
}
