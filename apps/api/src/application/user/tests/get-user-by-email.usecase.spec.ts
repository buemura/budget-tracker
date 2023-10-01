import { UserRepository } from '@domain/user/repositories/user.repository';
import { GetUserByEmailUsecase } from '../get-user-by-email.usecase';

describe('Get User by Email Use Case', () => {
  let repository: UserRepository;
  let getUserByEmailUsecase: GetUserByEmailUsecase;

  const defaultMock = () => null;

  beforeAll(() => {
    repository = {
      findMany: defaultMock,
      findById: defaultMock,
      findByEmail: defaultMock,
      create: defaultMock,
      update: defaultMock,
      remove: defaultMock,
    };

    getUserByEmailUsecase = new GetUserByEmailUsecase(repository);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should call UserRepository to retrieve user data by email', async () => {
    const email = 'john.doe@example.com';

    const repositorySpy = jest.spyOn(repository, 'findByEmail');
    await getUserByEmailUsecase.execute(email);

    expect(repositorySpy).toHaveBeenCalledTimes(1);
    expect(repositorySpy).toHaveBeenCalledWith(email);
  });

  it.todo('should user data by email');
});
