import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import IUsersTokensRepository from "@modules/accounts/repositories/IUsersTokens";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/providers/IDateProvider";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepoistory: IUsersTokensRepository,

    @inject("DateProvider")
    private dateProvider: IDateProvider,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userTokenExists = await this.usersTokensRepoistory.findByToken(token);

    if (!userTokenExists) {
      throw new AppError("Invalid Token!");
    }

    if (
      this.dateProvider.comapreIfBefore(
        userTokenExists.expires_date,
        this.dateProvider.createDate()
      )
    ) {
      throw new AppError("Invalid Token!");
    }

    const user = await this.usersRepository.findById(userTokenExists.user_id);

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.usersTokensRepoistory.deleteById(userTokenExists.id);
  }
}

export default ResetPasswordUseCase;
