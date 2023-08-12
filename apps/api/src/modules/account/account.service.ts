import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import {
  DEFAULT_PAGINATION,
  FindPaginatedByUserDto,
  paginationHelper,
} from '@helpers/pagination';
import { UserService } from '@modules/user/user.service';
import { CreateAccountDto } from './dtos/create-account.dto';
import { UpdateAccountDto } from './dtos/update-account.dto';
import { ERROR_MESSAGE } from './errors/messages';
import { AccountRepository } from './repositories/account.repository';

@Injectable()
export class AccountService {
  logger: Logger;

  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly userService: UserService,
  ) {
    this.logger = new Logger(AccountService.name);
  }

  async findMany({
    userId,
    pagination = {
      page: DEFAULT_PAGINATION.PAGE,
      items: DEFAULT_PAGINATION.ITEMS,
    },
  }: FindPaginatedByUserDto) {
    const user = await this.userService.getById(userId);
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

  async create(userId: string, data: CreateAccountDto): Promise<void> {
    const user = await this.userService.getById(userId);
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

  async update(id: string, data: UpdateAccountDto): Promise<void> {
    const account = await this.accountRepository.findById(id);
    if (!account) {
      this.logger.log(`Account ${id} not found`);
      throw new NotFoundException(ERROR_MESSAGE.ACCOUNT_NOT_FOUND);
    }

    this.logger.log(`Updating account ${id}`);
    await this.accountRepository.update(id, data);
    this.logger.log(`Successfully updated account ${id}`);
  }

  async remove(id: string): Promise<void> {
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
