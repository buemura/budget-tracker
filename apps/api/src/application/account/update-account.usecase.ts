import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { ERROR_MESSAGE } from '@domain/account/errors/messages';
import { IUpdateAccount } from '@domain/account/interfaces/account.interface';
import { AccountRepository } from '@domain/account/repositories/account.repository';

@Injectable()
export class UpdateAccountUsecase {
  protected logger: Logger;

  constructor(private readonly accountRepository: AccountRepository) {
    this.logger = new Logger(UpdateAccountUsecase.name);
  }

  async execute(id: string, data: IUpdateAccount): Promise<void> {
    const account = await this.accountRepository.findById(id);
    if (!account) {
      this.logger.log(`Account ${id} not found`);
      throw new NotFoundException(ERROR_MESSAGE.ACCOUNT_NOT_FOUND);
    }

    this.logger.log(`Updating account ${id}`);
    await this.accountRepository.update(id, data);
    this.logger.log(`Successfully updated account ${id}`);
  }
}
