import IMailProvider from '../models/IMailProvider';
import ISendMailProvider from '../dtos/ISendEmailDTO';

export default class FakeMailProvider implements IMailProvider {
  private messages: ISendMailProvider[] = [];

  public async sendEmail(message: ISendMailProvider): Promise<void> {
    this.messages.push(message);
  }
}
