import { ConflictException, Injectable } from '@nestjs/common';

import { PasswordHashService } from '@domain/cryptography/contracts';
import { User } from '@domain/user/entities/user';
import { ERROR_MESSAGE } from '@domain/user/errors/messages';
import { ICreateUser } from '@domain/user/interfaces/user.interface';
import { UserRepository } from '@domain/user/repositories/user.repository';
import { PASSWORD_HASH_SALT } from '@helpers/constants';

@Injectable()
export class CreateUserUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHashService: PasswordHashService,
  ) {}

  async execute(data: ICreateUser): Promise<User> {
    const user = await this.userRepository.findByEmail(data.email);

    if (user) {
      throw new ConflictException(ERROR_MESSAGE.USER_ALREADY_EXIST);
    }

    const hashedPassword = this.passwordHashService.hash(
      data.password,
      PASSWORD_HASH_SALT,
    );
    return this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
  }
}
