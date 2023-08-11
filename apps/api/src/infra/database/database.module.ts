import { Module } from '@nestjs/common';

import { ExpenseRepository } from '@modules/expense/repositories/expense.repository';
import { UserRepository } from '@modules/user/repositories/user.repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaExpenseRepository } from './prisma/repositories/prisma-expense.repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: ExpenseRepository,
      useClass: PrismaExpenseRepository,
    },
  ],
  exports: [UserRepository, ExpenseRepository],
})
export class DatabaseModule {}
