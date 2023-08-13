import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { AccountRepository } from '@domain/account/repositories/account.repository';
import { ERROR_MESSAGE } from '@domain/expense/errors/messages';
import {
  DEFAULT_PAGINATION,
  IFindPaginatedByUser,
  paginationHelper,
} from '@helpers/pagination';
import { GetUserByIdUsecase } from '@usecases/user';

@Injectable()
export class GetAccountsByUserUsecase {
  protected logger: Logger;

  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly getUserByIdUsecase: GetUserByIdUsecase,
  ) {
    this.logger = new Logger(GetAccountsByUserUsecase.name);
  }

  async execute({
    userId,
    pagination = {
      page: DEFAULT_PAGINATION.PAGE,
      items: DEFAULT_PAGINATION.ITEMS,
    },
  }: IFindPaginatedByUser) {
    const user = await this.getUserByIdUsecase.execute(userId);
    if (!user) {
      this.logger.log(`User ${userId} not found`);
      throw new NotFoundException(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    const { start, end } = paginationHelper.getSliceParams({
      page: pagination.page,
      items: pagination.items,
    });

    this.logger.log(`Getting accounts from user ${userId}`);
    const accounts = await this.accountRepository.findByUserId(userId);
    this.logger.log(`Successfully got accounts from user ${userId}`);

    const result = accounts.slice(start, end);

    const totalBalance = accounts
      .reduce((acc, account) => acc + account.balance, 0)
      .toFixed(2);

    const accountsMetrics = accounts.map((account) => ({
      name: account.name,
      balance: account.balance,
    }));

    const metadata = paginationHelper.getMetadata({
      data: accounts,
      page: pagination.page,
      items: pagination.items,
    });

    return {
      metadata,
      data: {
        accounts: result,
        totalBalance: Number(totalBalance),
        metricsData: accountsMetrics,
      },
    };
  }
}
