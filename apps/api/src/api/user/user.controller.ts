import { JwtAuthGuard } from '@api/auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UpdateUserDto } from '@api/user/dtos/update-user.dto';
import { UserResponseDto } from '@api/user/dtos/user-response.dto';
import { RemoveUserUsecase, UpdateUserUsecase } from '@application/user';
import { CurrentUserId } from '@helpers/decorators/current-user.decorator';
import { UnauthorizedResponseDto } from '@helpers/dtos/unauthorized-response.dto';

@ApiTags('Users')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private readonly updateUserUsecase: UpdateUserUsecase,
    private readonly removeUserUsecase: RemoveUserUsecase,
  ) {}

  @Patch()
  @ApiOkResponse({ type: UserResponseDto })
  async update(
    @CurrentUserId() userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.updateUserUsecase.execute(userId, updateUserDto);
  }

  @Delete()
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@CurrentUserId() userId: string): Promise<void> {
    return this.removeUserUsecase.execute(userId);
  }
}
