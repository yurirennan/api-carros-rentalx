import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import UsersRepository from "../modules/accounts/repositories/implementations/UsersRepository";

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
      "1c337b8875d720aecd45a9ce37e436d6"
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

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
