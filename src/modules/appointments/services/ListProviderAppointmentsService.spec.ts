import AppError from '@shared/errors/AppError';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmensRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmensRepository;
let listProviderAppointments: ListProviderAppointmentsService;
let fakeCacheProvider: FakeCacheProvider;

describe('listProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmensRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the on a specific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const apppointments = await listProviderAppointments.execute({
      provider_id: 'provider',
      day: 20,
      year: 2020,
      month: 5,
    });

    expect(apppointments).toEqual([appointment1, appointment2]);
  });
});
