import { Module } from '@nestjs/common';

import { UserModule } from '@api/user/user.module';
import {
  CreateAccountUsecase,
  GetAccountsByUserUsecase,
  RemoveAccountUsecase,
  UpdateAccountUsecase,
} from '@application/account';
import { DatabaseModule } from '@infra/database/database.module';
import { AccountController } from './account.controller';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [AccountController],
  providers: [
    GetAccountsByUserUsecase,
    CreateAccountUsecase,
    UpdateAccountUsecase,
    RemoveAccountUsecase,
  ],
})
export class AccountModule {}
