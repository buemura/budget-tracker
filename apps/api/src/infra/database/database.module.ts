import { Module } from '@nestjs/common';

import { AccountRepository } from '@domain/account/repositories/account.repository';
import { ExpenseRepository } from '@domain/expense/repositories/expense.repository';
import { UserRepository } from '@domain/user/repositories/user.repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaAccountRepository } from './prisma/repositories/prisma-account.repository';
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
    {
      provide: AccountRepository,
      useClass: PrismaAccountRepository,
    },
  ],
  exports: [UserRepository, ExpenseRepository, AccountRepository],
})
export class DatabaseModule {}
