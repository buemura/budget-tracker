import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { ERROR_MESSAGE } from '@domain/expense/errors/messages';
import { ExpenseRepository } from '@domain/expense/repositories/expense.repository';
import {
  DEFAULT_PAGINATION,
  IFindPaginatedByUser,
  paginationHelper,
} from '@helpers/pagination';
import { GetUserByIdUsecase } from '@usecases/user';

@Injectable()
export class GetExpensesByUserUsecase {
  protected logger: Logger;

  constructor(
    private readonly expenseRepository: ExpenseRepository,
    private readonly getUserByIdUsecase: GetUserByIdUsecase,
  ) {
    this.logger = new Logger(GetExpensesByUserUsecase.name);
  }

  async execute({
    userId,
    pagination = {
      page: DEFAULT_PAGINATION.PAGE,
      items: DEFAULT_PAGINATION.ITEMS,
    },
  }: IFindPaginatedByUser) {
    const { page, items } = pagination;
    const userExists = await this.getUserByIdUsecase.execute(userId);
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
}
