"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeHashProvider;
let fakeUsersRepository;
let updateProfile;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new _FakeHashProvider.default();
    fakeUsersRepository = new _FakeUsersRepository.default();
    updateProfile = new _UpdateProfileService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to update profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'johndoe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'johntre',
      email: 'johntre@example.com'
    });
    expect(updateUser.name).toBe('johntre');
    expect(updateUser.email).toBe('johntre@example.com');
  });
  it('should not be able to change another user email', async () => {
    await fakeUsersRepository.create({
      name: 'johndoe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const user = await fakeUsersRepository.create({
      name: 'test',
      email: 'johndoe@example.com',
      password: '123456'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'johndoe',
      email: 'johndoe@example.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'johndoe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'johntre',
      email: 'johntre@example.com',
      old_password: '123456',
      password: '1234'
    });
    expect(updateUser.password).toBe('1234');
  });
  it('should not be able to update password without old_password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'johndoe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'johntre',
      email: 'johntre@example.com',
      password: '1234'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update password with wrong password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'johndoe',
      email: 'johndoe@example.com',
      password: '123456'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'johntre',
      email: 'johntre@example.com',
      old_password: 'wrong-password',
      password: '1234'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update profile from non-existing user', async () => {
    await expect(updateProfile.execute({
      user_id: 'non-existing-user',
      name: 'non',
      email: 'non@existing.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});