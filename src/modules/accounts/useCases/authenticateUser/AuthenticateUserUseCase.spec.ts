import ICreateUsersDTO from "@modules/accounts/dtos/ICreateUsersDTO";
import { AppError } from "@shared/errors/AppError";

import UsersRepositoryInMemory from "../../repositories/in-memory/UsersRepositoryInMemory";
import CreateUserUseCase from "../createUser/CreateUserUseCase";
import AuthenticateUserUseCase from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUsersDTO = {
      name: "User Test",
      email: "usertest@test.com",
      password: "123456",
      driver_license: "000123",
    };

    await createUserUseCase.execute(user);

    const token = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(token).toHaveProperty("token");
  });

  it("should not be able to authenticate a non existent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "usertest@test.com",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate an user with incorrect password", () => {
    expect(async () => {
      const user: ICreateUsersDTO = {
        name: "User Test",
        email: "usertest@test.com",
        password: "123456",
        driver_license: "000123",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrectPassword",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
