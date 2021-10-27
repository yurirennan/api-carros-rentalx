import { IMailProvider } from "../IMailProvider";

class MailProviderInMemory implements IMailProvider {
  private emails: any[] = [];

  async sendEmail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    this.emails.push({
      to,
      subject,
      variables,
      path,
    });
  }
}

export default MailProviderInMemory;
