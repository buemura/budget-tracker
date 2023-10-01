import { Injectable, Logger } from '@nestjs/common';

import { ExpenseRepository } from '@domain/expense/repositories/expense.repository';

@Injectable()
export class ResetExpensesPaymentStatusUsecase {
  protected logger: Logger;

  constructor(private readonly expenseRepository: ExpenseRepository) {
    this.logger = new Logger(ResetExpensesPaymentStatusUsecase.name);
  }

  async execute() {
    this.logger.log('Reseting all expenses payment status');
    await this.expenseRepository.updateAll();
    this.logger.log('Successfully reseted all expenses payment status');
    return {
      data: {
        message: 'successfully reset payment status',
      },
    };
  }
}
