import { ConflictException, Injectable } from '@nestjs/common';

import { User } from '@domain/user/entities/user';
import { ERROR_MESSAGE } from '@domain/user/errors/messages';
import { ICreateUser } from '@domain/user/interfaces/user.interface';
import { UserRepository } from '@domain/user/repositories/user.repository';

@Injectable()
export class CreateUserUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: ICreateUser): Promise<User> {
    const user = await this.userRepository.findByEmail(data.email);
    if (user) {
      throw new ConflictException(ERROR_MESSAGE.USER_ALREADY_EXIST);
    }

    return this.userRepository.create(data);
  }
}
