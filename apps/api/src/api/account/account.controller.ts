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

import { AccountService } from '@api/account/account.service';
import { CreateAccountDto } from '@api/account/dtos/create-account.dto';
import { UpdateAccountDto } from '@api/account/dtos/update-account.dto';
import { JwtAuthGuard } from '@api/auth/guards/jwt-auth.guard';
import { PaginationRequestDto } from '@helpers/pagination';
import { CurrentUserId } from '@shared/decorators/current-user.decorator';
import { UnauthorizedResponseDto } from '@shared/dtos/unauthorized-response.dto';

@ApiTags('Accounts')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
@Controller('accounts')
@UseGuards(JwtAuthGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK })
  async findMany(
    @CurrentUserId() userId: string,
    @Query() pagination: PaginationRequestDto,
  ) {
    return this.accountService.findMany({ userId, pagination });
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED })
  create(
    @CurrentUserId() userId: string,
    @Body() data: CreateAccountDto,
  ): Promise<void> {
    return this.accountService.create(userId, data);
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK })
  update(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ): Promise<void> {
    return this.accountService.update(id, updateAccountDto);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.accountService.remove(id);
  }
}
