import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from '@domain/user/entities/user';
import { ERROR_MESSAGE } from '@domain/user/errors/messages';
import { IUpdateUser } from '@domain/user/interfaces/user.interface';
import { UserRepository } from '@domain/user/repositories/user.repository';

@Injectable()
export class UpdateUserUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string, data: IUpdateUser): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    return this.userRepository.update(id, data);
  }
}
