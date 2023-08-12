import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import {
  DEFAULT_PAGINATION,
  FindPaginatedByUserDto,
  paginationHelper,
} from '@helpers/pagination';
import { UserService } from '@modules/user/user.service';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { UpdateExpenseDto } from './dtos/update-expense.dto';
import { ERROR_MESSAGE } from './errors/messages';
import { ExpenseRepository } from './repositories/expense.repository';

@Injectable()
export class ExpenseService {
  logger: Logger;

  constructor(
    private readonly expenseRepository: ExpenseRepository,
    private readonly userService: UserService,
  ) {
    this.logger = new Logger(ExpenseService.name);
  }

  async findMany({
    userId,
    pagination = {
      page: DEFAULT_PAGINATION.PAGE,
      items: DEFAULT_PAGINATION.ITEMS,
    },
  }: FindPaginatedByUserDto) {
    const { page, items } = pagination;
    const userExists = await this.userService.getById(userId);
    if (!userExists) {
      this.logger.log(`User ${userId} not found`);
      throw new NotFoundException(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    const { start, end } = paginationHelper.getSliceParams({
      page,
      items,
    });

    this.logger.log(`Getting expenses from user ${userId}`);

    const expenses = await this.expenseRepository.findByUserId(userId);
    const result = expenses.slice(start, end);
    const metadata = paginationHelper.getMetadata({
      data: expenses,
      page,
      items,
    });

    this.logger.log(`Successfully got expenses from user ${userId}`);

    return {
      metadata,
      data: result,
    };
  }

  async create(userId: string, data: CreateExpenseDto): Promise<void> {
    const userExists = await this.userService.getById(userId);
    if (!userExists) {
      this.logger.log(`[CreateExpenseUsecase]: Related user not found`);
      throw new NotFoundException(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    this.logger.log('Creating expense');
    await this.expenseRepository.create(data);
    this.logger.log('Successfully created expense');
  }

  async update(id: string, data: UpdateExpenseDto): Promise<void> {
    const expenseExists = await this.expenseRepository.findById(id);
    if (!expenseExists) {
      this.logger.log(`Expense ${id} not found`);
      throw new NotFoundException(ERROR_MESSAGE.EXPENSE_NOT_FOUND);
    }

    this.logger.log(`Updating expense ${id}`);
    await this.expenseRepository.update(id, data);
    this.logger.log(`Successfully updated expense ${id}`);
  }

  async resetPaymentStatus() {
    this.logger.log('Reseting all expenses payment status');
    await this.expenseRepository.updateAll();
    this.logger.log('Successfully reseted all expenses payment status');
    return {
      data: {
        message: 'successfully reset payment status',
      },
    };
  }

  async remove(id: string): Promise<void> {
    const expenseExists = await this.expenseRepository.findById(id);
    if (!expenseExists) {
      this.logger.log(`Expense ${id} not found`);
      throw new NotFoundException(ERROR_MESSAGE.EXPENSE_NOT_FOUND);
    }

    this.logger.log(`Deleting expense ${id}`);
    await this.expenseRepository.remove(id);
    this.logger.log(`Successfully deleted expense ${id}`);
  }
}
