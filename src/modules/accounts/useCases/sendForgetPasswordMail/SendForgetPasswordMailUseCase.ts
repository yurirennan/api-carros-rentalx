import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuid } from "uuid";

import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import IUsersTokensRepository from "@modules/accounts/repositories/IUsersTokens";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/providers/IDateProvider";
import { IMailProvider } from "@shared/providers/IMailProvider";

@injectable()
class SendForgetPasswordMailUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,

    @inject("DateProvider")
    private dateProvider: IDateProvider,

    @inject("EtherealMailProvider")
    private etherealMailProvideer: IMailProvider
  ) {}

  async execute(email: string): Promise<void> {
    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "forgotPassword.hbs"
    );
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exists!");
    }

    const token = uuid();
    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });

    const emailVariables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.etherealMailProvideer.sendEmail(
      email,
      "Recuperação de senha",
      emailVariables,
      templatePath
    );
  }
}

export default SendForgetPasswordMailUseCase;
