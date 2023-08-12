import { Module } from '@nestjs/common';

import { RemoveUserUsecase } from '@application/user';
import { CreateUserUsecase } from '@application/user/create-user.usecase';
import { GetUserByEmailUsecase } from '@application/user/get-user-by-email.usecase';
import { GetUserByIdUsecase } from '@application/user/get-user-by-id.usecase';
import { UpdateUserUsecase } from '@application/user/update-user.usecase';
import { DatabaseModule } from '@infra/database/database.module';
import { UserController } from './user.controller';

const providers = [
  GetUserByIdUsecase,
  GetUserByEmailUsecase,
  CreateUserUsecase,
  UpdateUserUsecase,
  RemoveUserUsecase,
];

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [...providers],
  exports: [...providers],
})
export class UserModule {}
