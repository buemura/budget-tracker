import { Injectable } from '@nestjs/common';

import { UserRepository } from '@domain/user/repositories/user.repository';

@Injectable()
export class RemoveUserUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    await this.userRepository.remove(id);
  }
}
