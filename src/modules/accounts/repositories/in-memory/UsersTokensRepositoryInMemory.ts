import { IUsersTokens } from "@modules/accounts/dtos/IUsersTokensDTO";
import UserTokens from "@modules/accounts/infra/typeorm/entities/UserTokens";

import IUsersTokensRepository from "../IUsersTokens";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = [];

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: IUsersTokens): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async findByToken(token: string): Promise<UserTokens> {
    const tokenAlreadyExists = this.usersTokens.find(
      (userToken) => userToken.refresh_token === token
    );

    return tokenAlreadyExists;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    token: string
  ): Promise<UserTokens> {
    const tokenAlreadyExists = this.usersTokens.find(
      (userToken) =>
        userToken.user_id === user_id && userToken.refresh_token === token
    );

    return tokenAlreadyExists;
  }

  async deleteById(id: string): Promise<void> {
    const token = this.usersTokens.find((userToken) => userToken.id === id);

    this.usersTokens.splice(this.usersTokens.indexOf(token));
  }
}

export default UsersTokensRepositoryInMemory;
