import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { ERROR_MESSAGE } from '@domain/expense/errors/messages';
import { ExpenseRepository } from '@domain/expense/repositories/expense.repository';

@Injectable()
export class RemoveExpenseUsecase {
  protected logger: Logger;

  constructor(private readonly expenseRepository: ExpenseRepository) {
    this.logger = new Logger(RemoveExpenseUsecase.name);
  }

  async execute(id: string): Promise<void> {
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
