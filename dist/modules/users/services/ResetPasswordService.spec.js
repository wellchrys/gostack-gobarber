"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeUsersTokensRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersTokensRepository"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _ResetPasswordService = _interopRequireDefault(require("./ResetPasswordService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeUserTokensRepository;
let resetPasswordService;
let fakeHashProvider;
describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeUserTokensRepository = new _FakeUsersTokensRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    resetPasswordService = new _ResetPasswordService.default(fakeUsersRepository, fakeUserTokensRepository, fakeHashProvider);
  });
  it('should be able to reset password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john',
      email: 'john@example.com',
      password: '123456'
    });
    const {
      token
    } = await fakeUserTokensRepository.generate(user.id);
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
    await resetPasswordService.execute({
      password: '1234',
      token
    });
    const updateUser = await fakeUsersRepository.findById(user.id);
    expect(generateHash).toHaveBeenCalledWith('1234');
    expect(updateUser?.password).toBe('1234');
  });
  it('should not be able to reset password with non-existing token', async () => {
    await expect(resetPasswordService.execute({
      token: 'no-token',
      password: '21341234'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to reset password with non-existing user', async () => {
    const {
      token
    } = await fakeUserTokensRepository.generate('no-user');
    await expect(resetPasswordService.execute({
      token,
      password: '21341234'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to reset password if passed more than 2 hours', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john',
      email: 'john@example.com',
      password: '1234'
    });
    const {
      token
    } = await fakeUserTokensRepository.generate(user.id);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });
    await expect(resetPasswordService.execute({
      token,
      password: '21341234'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});