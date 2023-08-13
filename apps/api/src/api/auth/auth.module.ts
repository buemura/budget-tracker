import { Module } from '@nestjs/common';

import { UserModule } from '@api/user/user.module';
import { DatabaseModule } from '@infra/database/database.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [AuthController],
  providers: [JwtStrategy],
})
export class AuthModule {}
