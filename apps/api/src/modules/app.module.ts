import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AuthModule } from './auth/auth.module';
import { ExpenseModule } from './expense/expense.module';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../', 'client/dist'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    AuthModule,
    UserModule,
    ExpenseModule,
    AccountModule,
  ],
})
export class AppModule {}
