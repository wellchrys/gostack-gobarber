"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/fakes/FakeMailProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeUsersTokensRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersTokensRepository"));

var _SendForgotPasswordEmailService = _interopRequireDefault(require("./SendForgotPasswordEmailService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeUserTokensRepository;
let fakeMailProvider;
let sendForgotPasswordEmail;
describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeMailProvider = new _FakeMailProvider.default();
    fakeUserTokensRepository = new _FakeUsersTokensRepository.default();
    sendForgotPasswordEmail = new _SendForgotPasswordEmailService.default(fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository);
  });
  it('should be able to recover password using the email', async () => {
    const sendEmail = jest.spyOn(fakeMailProvider, 'sendEmail');
    await fakeUsersRepository.create({
      name: 'john',
      email: 'john@example.com',
      password: '123456'
    });
    await sendForgotPasswordEmail.execute({
      email: 'john@example.com'
    });
    expect(sendEmail).toHaveBeenCalled();
  });
  it('should not be able to recover non-existing user password', async () => {
    await expect(sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com'
    });
    expect(generateToken).rejects.toHaveBeenCalledWith(user.id);
  });
});