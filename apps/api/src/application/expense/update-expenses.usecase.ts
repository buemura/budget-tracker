import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { ERROR_MESSAGE } from '@domain/expense/errors/messages';
import { IUpdateExpense } from '@domain/expense/interfaces/expense.interface';
import { ExpenseRepository } from '@domain/expense/repositories/expense.repository';

@Injectable()
export class UpdateExpenseUsecase {
  protected logger: Logger;

  constructor(private readonly expenseRepository: ExpenseRepository) {
    this.logger = new Logger(UpdateExpenseUsecase.name);
  }

  async execute(id: string, data: IUpdateExpense): Promise<void> {
    const expenseExists = await this.expenseRepository.findById(id);
    if (!expenseExists) {
      this.logger.log(`Expense ${id} not found`);
      throw new NotFoundException(ERROR_MESSAGE.EXPENSE_NOT_FOUND);
    }

    this.logger.log(`Updating expense ${id}`);
    await this.expenseRepository.update(id, data);
    this.logger.log(`Successfully updated expense ${id}`);
  }
}
