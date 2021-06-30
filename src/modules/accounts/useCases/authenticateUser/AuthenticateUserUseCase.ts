import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

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
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
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
    const token = sign({}, "1c337b8875d720aecd45a9ce37e436d6", {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturned: IResponse = {
      token,
      user: {
        name: user.name,
        email,
      },
    };

    return tokenReturned;
  }
}

export default AuthenticateUserUseCase;
