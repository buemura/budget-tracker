import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { UserModule } from '@modules/user/user.module';
import { ExpenseController } from './expense.controller';
import { ExpenseService } from './expense.service';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule {}
