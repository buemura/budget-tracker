import { Test, TestingModule } from '@nestjs/testing';

import {
  CreateExpenseUsecase,
  GetExpensesByUserUsecase,
  RemoveExpenseUsecase,
  ResetExpensesPaymentStatusUsecase,
  UpdateExpenseUsecase,
} from '@application/expense';
import { ExpenseController } from '../expense.controller';

describe('ExpenseController', () => {
  let controller: ExpenseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseController],
      providers: [
        GetExpensesByUserUsecase,
        CreateExpenseUsecase,
        UpdateExpenseUsecase,
        ResetExpensesPaymentStatusUsecase,
        RemoveExpenseUsecase,
      ],
    }).compile();

    controller = module.get<ExpenseController>(ExpenseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
