import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { ERROR_MESSAGE } from '@domain/account/errors/messages';
import { ICreateAccount } from '@domain/account/interfaces/account.interface';
import { AccountRepository } from '@domain/account/repositories/account.repository';
import { GetUserByIdUsecase } from '@usecases/user';

@Injectable()
export class CreateAccountUsecase {
  protected logger: Logger;

  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly getUserByIdUsecase: GetUserByIdUsecase,
  ) {
    this.logger = new Logger(CreateAccountUsecase.name);
  }

  async execute(userId: string, data: ICreateAccount): Promise<void> {
    const user = await this.getUserByIdUsecase.execute(userId);
    if (!user) {
      this.logger.log(`User ${userId} not found`);
      throw new NotFoundException(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    this.logger.log('Creating account');
    await this.accountRepository.create({
      userId,
      name: data.name,
      balance: data.balance ? Number(data.balance) : 0,
      icon: data.icon ? String(data.icon) : '',
    });
    this.logger.log('Successfully created account');
  }
}
