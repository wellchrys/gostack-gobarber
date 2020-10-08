import ISendMailDTO from '../dtos/ISendEmailDTO';

export default interface IMailProvider {
  sendEmail(data: ISendMailDTO): Promise<void>;
}
