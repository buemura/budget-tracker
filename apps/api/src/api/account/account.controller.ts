import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CreateAccountDto } from '@api/account/dtos/create-account.dto';
import { UpdateAccountDto } from '@api/account/dtos/update-account.dto';
import { JwtAuthGuard } from '@api/auth/guards/jwt-auth.guard';
import { CurrentUserId } from '@helpers/decorators/current-user.decorator';
import { UnauthorizedResponseDto } from '@helpers/dtos/unauthorized-response.dto';
import { PaginationRequestDto } from '@helpers/pagination';
import {
  CreateAccountUsecase,
  GetAccountsByUserUsecase,
  RemoveAccountUsecase,
  UpdateAccountUsecase,
} from '@usecases/account';

@ApiTags('Accounts')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
@Controller('accounts')
@UseGuards(JwtAuthGuard)
export class AccountController {
  constructor(
    private readonly getAccountsByUserUsecase: GetAccountsByUserUsecase,
    private readonly createAccountUsecase: CreateAccountUsecase,
    private readonly updateAccountUsecase: UpdateAccountUsecase,
    private readonly removeAccountUsecase: RemoveAccountUsecase,
  ) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK })
  async findMany(
    @CurrentUserId() userId: string,
    @Query() pagination: PaginationRequestDto,
  ) {
    return this.getAccountsByUserUsecase.execute({ userId, pagination });
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED })
  create(
    @CurrentUserId() userId: string,
    @Body() data: CreateAccountDto,
  ): Promise<void> {
    return this.createAccountUsecase.execute(userId, data);
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK })
  update(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ): Promise<void> {
    return this.updateAccountUsecase.execute(id, updateAccountDto);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.removeAccountUsecase.execute(id);
  }
}
