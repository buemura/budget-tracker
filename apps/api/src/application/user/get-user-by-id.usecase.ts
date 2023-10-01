import { Injectable } from '@nestjs/common';

import { User } from '@domain/user/entities/user';
import { UserRepository } from '@domain/user/repositories/user.repository';

@Injectable()
export class GetUserByIdUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<User> {
    return this.userRepository.findById(id);
  }
}
