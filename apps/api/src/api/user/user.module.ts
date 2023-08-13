import { Module } from '@nestjs/common';

import { LoginUserUsecase, RemoveUserUsecase } from '@application/user';
import { CreateUserUsecase } from '@application/user/create-user.usecase';
import { GetUserByEmailUsecase } from '@application/user/get-user-by-email.usecase';
import { GetUserByIdUsecase } from '@application/user/get-user-by-id.usecase';
import { UpdateUserUsecase } from '@application/user/update-user.usecase';
import { DatabaseModule } from '@infra/database/database.module';
import { ProvidersModule } from '@infra/providers/providers.module';
import { UserController } from './user.controller';

const providers = [
  LoginUserUsecase,
  GetUserByIdUsecase,
  GetUserByEmailUsecase,
  CreateUserUsecase,
  UpdateUserUsecase,
  RemoveUserUsecase,
];

@Module({
  imports: [DatabaseModule, ProvidersModule],
  controllers: [UserController],
  providers: [...providers],
  exports: [...providers],
})
export class UserModule {}
