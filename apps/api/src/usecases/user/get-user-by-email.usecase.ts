import { Injectable } from '@nestjs/common';

import { User } from '@domain/user/entities/user';
import { UserRepository } from '@domain/user/repositories/user.repository';

@Injectable()
export class GetUserByEmailUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }
}
