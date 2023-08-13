import { ConflictException } from '@nestjs/common';

import { PasswordHashService } from '@domain/cryptography/contracts';
import { UserRepository } from '@domain/user/repositories/user.repository';
import { CreateUserUsecase } from '../create-user.usecase';

describe('Create User Use Case', () => {
  let repository: UserRepository;
  let passwordHashService: PasswordHashService;
  let createUserUsecase: CreateUserUsecase;

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

    passwordHashService = {
      compare: defaultMock,
      hash: (input: string) => input,
    };

    createUserUsecase = new CreateUserUsecase(repository, passwordHashService);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should throw a ConflictException when there is a user with provided email', async () => {
    jest.spyOn(repository, 'findByEmail').mockResolvedValueOnce({
      id: '1',
      name: 'name',
      email: 'email',
      password: 'password',
      profilePicture: 'profilePicture',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await expect(
      createUserUsecase.execute({
        name: '',
        email: '',
        password: '',
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('should call UserRepository to persist user data', async () => {
    const userInput = {
      name: 'john doe',
      email: 'john.doe@example.com',
      password: 'password',
    };

    const repositorySpy = jest.spyOn(repository, 'create');
    await createUserUsecase.execute(userInput);

    expect(repositorySpy).toHaveBeenCalledTimes(1);
    expect(repositorySpy).toHaveBeenCalledWith(userInput);
  });
});
