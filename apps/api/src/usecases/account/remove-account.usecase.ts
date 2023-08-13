import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { ERROR_MESSAGE } from '@domain/account/errors/messages';
import { AccountRepository } from '@domain/account/repositories/account.repository';

@Injectable()
export class RemoveAccountUsecase {
  protected logger: Logger;

  constructor(private readonly accountRepository: AccountRepository) {
    this.logger = new Logger(RemoveAccountUsecase.name);
  }

  async execute(id: string): Promise<void> {
    const account = await this.accountRepository.findById(id);
    if (!account) {
      this.logger.log(`Account ${id} not found`);
      throw new NotFoundException(ERROR_MESSAGE.ACCOUNT_NOT_FOUND);
    }

    this.logger.log(`Deleting account ${id}`);
    await this.accountRepository.remove(id);
    this.logger.log(`Successfully deleted account ${id}`);
  }
}
