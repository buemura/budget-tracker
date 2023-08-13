import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { ProvidersModule } from '@infra/providers/providers.module';
import { LoginUserUsecase, RemoveUserUsecase } from '@usecases/user';
import { CreateUserUsecase } from '@usecases/user/create-user.usecase';
import { GetUserByEmailUsecase } from '@usecases/user/get-user-by-email.usecase';
import { GetUserByIdUsecase } from '@usecases/user/get-user-by-id.usecase';
import { UpdateUserUsecase } from '@usecases/user/update-user.usecase';
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
