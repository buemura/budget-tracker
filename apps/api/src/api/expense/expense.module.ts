import { Module } from '@nestjs/common';

import { UserModule } from '@api/user/user.module';
import { DatabaseModule } from '@infra/database/database.module';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule {}
