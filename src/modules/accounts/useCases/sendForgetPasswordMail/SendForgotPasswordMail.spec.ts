import UsersRepositoryInMemory from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import UsersTokensRepositoryInMemory from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import DateProvider from "@shared/providers/implementations/DateProvider";
import MailProviderInMemory from "@shared/providers/implementations/MailProviderInMemory";

import SendForgetPasswordMailUseCase from "./SendForgetPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgetPasswordMailUseCase;
let usersRepository: UsersRepositoryInMemory;
let usersTokensRepository: UsersTokensRepositoryInMemory;
let dateProvider: DateProvider;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Password", () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    usersTokensRepository = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();
    dateProvider = new DateProvider();

    sendForgotPasswordMailUseCase = new SendForgetPasswordMailUseCase(
      usersRepository,
      usersTokensRepository,
      dateProvider,
      mailProvider
    );
  });

  it("Should be able to send forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendEmail");

    await usersRepository.create({
      name: "User Test",
      email: "usertest@test.com",
      password: "123456",
      driver_license: "000123",
    });

    await sendForgotPasswordMailUseCase.execute("usertest@test.com");

    expect(sendMail).toBeCalled();
  });

  it("Should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("usertest@test.com")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });
});
