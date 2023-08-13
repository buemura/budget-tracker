import { Module } from '@nestjs/common';

import { UserModule } from '@api/user/user.module';
import { DatabaseModule } from '@infra/database/database.module';
import {
  CreateExpenseUsecase,
  GetExpensesByUserUsecase,
  RemoveExpenseUsecase,
  ResetExpensesPaymentStatusUsecase,
  UpdateExpenseUsecase,
} from '@usecases/expense';
import { ExpenseController } from './expense.controller';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [ExpenseController],
  providers: [
    GetExpensesByUserUsecase,
    CreateExpenseUsecase,
    UpdateExpenseUsecase,
    ResetExpensesPaymentStatusUsecase,
    RemoveExpenseUsecase,
  ],
})
export class ExpenseModule {}
