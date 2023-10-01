import { UserRepository } from '@domain/user/repositories/user.repository';
import { GetUserByIdUsecase } from '../get-user-by-id.usecase';

describe('Get User by Id Use Case', () => {
  let repository: UserRepository;
  let getUserByIdUsecase: GetUserByIdUsecase;

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

    getUserByIdUsecase = new GetUserByIdUsecase(repository);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should call UserRepository to retrieve user data by id', async () => {
    const id = 'usr1';

    const repositorySpy = jest.spyOn(repository, 'findById');
    await getUserByIdUsecase.execute(id);

    expect(repositorySpy).toHaveBeenCalledTimes(1);
    expect(repositorySpy).toHaveBeenCalledWith(id);
  });

  it.todo('should user data by id');
});
