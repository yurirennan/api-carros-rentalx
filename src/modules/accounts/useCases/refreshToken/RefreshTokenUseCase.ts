import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import authConfig from "@config/authConfig";
import IUsersTokensRepository from "@modules/accounts/repositories/IUsersTokens";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/providers/IDateProvider";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,

    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<string> {
    const { email, sub } = verify(
      token,
      authConfig.expires_in_refresh_token
    ) as IPayload;

    const user_id = sub;

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!userToken) {
      throw new AppError("Refresh Token Error");
    }

    const refresh_token = sign({ email }, authConfig.secret_refresh_token, {
      subject: sub,
      expiresIn: authConfig.expires_in_refresh_token,
    });

    await this.usersTokensRepository.create({
      user_id: sub,
      refresh_token,
      expires_date: this.dateProvider.addDays(
        authConfig.expires_in_refresh_token_days
      ),
    });

    return refresh_token;
  }
}

export default RefreshTokenUseCase;
