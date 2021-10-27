import { IUsersTokens } from "../dtos/IUsersTokensDTO";
import UserTokens from "../infra/typeorm/entities/UserTokens";

interface IUsersTokensRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: IUsersTokens): Promise<UserTokens>;

  findByToken(token: string): Promise<UserTokens>;
  findByUserIdAndRefreshToken(
    user_id: string,
    token: string
  ): Promise<UserTokens>;

  deleteById(id: string): Promise<void>;
}

export default IUsersTokensRepository;
