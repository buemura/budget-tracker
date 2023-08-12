import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { UserModule } from '@modules/user/user.module';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
