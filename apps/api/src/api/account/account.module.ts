import { Module } from '@nestjs/common';

import { UserModule } from '@api/user/user.module';
import { DatabaseModule } from '@infra/database/database.module';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
