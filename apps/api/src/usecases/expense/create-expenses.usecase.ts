import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { ERROR_MESSAGE } from '@domain/expense/errors/messages';
import { ICreateExpense } from '@domain/expense/interfaces/expense.interface';
import { ExpenseRepository } from '@domain/expense/repositories/expense.repository';
import { GetUserByIdUsecase } from '@usecases/user';

@Injectable()
export class CreateExpenseUsecase {
  protected logger: Logger;

  constructor(
    private readonly expenseRepository: ExpenseRepository,
    private readonly getUserByIdUsecase: GetUserByIdUsecase,
  ) {
    this.logger = new Logger(CreateExpenseUsecase.name);
  }

  async execute(userId: string, data: ICreateExpense): Promise<void> {
    const user = await this.getUserByIdUsecase.execute(userId);
    if (!user) {
      this.logger.log(`[CreateExpenseUsecase]: Related user not found`);
      throw new NotFoundException(ERROR_MESSAGE.USER_NOT_FOUND);
    }

    this.logger.log('Creating expense');
    await this.expenseRepository.create(data);
    this.logger.log('Successfully created expense');
  }
}
