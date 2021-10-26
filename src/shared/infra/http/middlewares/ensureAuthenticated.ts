import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import authConfig from "@config/authConfig";
import UsersRepository from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import UsersTokensRepository from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const auth = request.headers.authorization;

  if (!auth) throw new AppError("Token Missing!", 401);

  const [, token] = auth.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      authConfig.secret_refresh_token
    ) as IPayload;

    const usersTokensRepository = new UsersTokensRepository();

    const user = await usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!user) throw new AppError("User Not Found!", 401);

    // Da erro por causa da tipagem, é necessário sobreescrever a tipagem
    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError("Invalid Token", 401);
  }
}
