import { getRepository, Repository } from "typeorm";

import { IUsersTokens } from "@modules/accounts/dtos/IUsersTokensDTO";
import IUsersTokensRepository from "@modules/accounts/repositories/IUsersTokens";

import UserTokens from "../entities/UserTokens";

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: IUsersTokens): Promise<UserTokens> {
    const userTokens = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userTokens);

    return userTokens;
  }

  async findByToken(token: string): Promise<UserTokens> {
    const userToken = await this.repository.findOne({
      where: { refresh_token: token },
    });

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    token: string
  ): Promise<UserTokens> {
    const userToken = await this.repository.findOne({
      where: { user_id, refresh_token: token },
    });

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default UsersTokensRepository;
