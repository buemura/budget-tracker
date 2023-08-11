import { Injectable } from '@nestjs/common';

import { UserNotFoundError } from '@domain/user/errors/user-not-found.error';
import { UserRepository } from '@domain/user/repositories/user.repository';
import { Logger } from '@helpers/logger';
import { ResponseDto } from '@shared/dtos/response.dto';
import { MissingParametersError } from '@shared/errors/missing-parameters.error';

@Injectable()
export class GetUserDetailsUsecase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: Logger,
  ) {}

  async execute(userId: string): Promise<ResponseDto> {
    if (!userId) {
      this.logger.info(`[GetUserDetailsUsecase]: Missing required parameter`);
      throw new MissingParametersError('userId');
    }

    this.logger.info(`[GetUserDetailsUsecase]: Getting user ${userId} details`);

    const user = await this.userRepository.findById(userId);
    if (!user) {
      this.logger.info(`[GetUserDetailsUsecase]: User ${userId} not found`);
      throw new UserNotFoundError();
    }

    const { password, ...result } = user;

    this.logger.info(
      `[GetUserDetailsUsecase]: Successfully got user ${userId} details`,
    );

    return {
      data: result,
    };
  }
}
