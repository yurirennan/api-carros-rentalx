import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import authConfig from "@config/authConfig";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import IUsersTokensRepository from "@modules/accounts/repositories/IUsersTokens";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/providers/IDateProvider";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,

    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // Verificar se o usuario existe
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError("Email or Password incorrect", 401);

    // Verificar se a senha esta correta
    const passwordCorrect = await compare(password, user.password);

    if (!passwordCorrect)
      throw new AppError("Email or Password incorrect", 401);

    // criar o token
    // parametros informações adicionais, md5 hash
    const token = sign({}, authConfig.secret_token, {
      subject: user.id,
      expiresIn: authConfig.expires_in_token,
    });

    const refresh_token = sign({ email }, authConfig.secret_refresh_token, {
      subject: user.id,
      expiresIn: authConfig.expires_in_refresh_token,
    });

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: this.dateProvider.addDays(
        authConfig.expires_in_refresh_token_days
      ),
    });

    const tokenReturned: IResponse = {
      token,
      user: {
        name: user.name,
        email,
      },
      refresh_token,
    };

    return tokenReturned;
  }
}

export default AuthenticateUserUseCase;
