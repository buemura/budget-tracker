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

import { PaginationRequestDto } from '@helpers/pagination/dto-transformer';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { CurrentUserId } from '@shared/decorators/current-user.decorator';
import { UnauthorizedResponseDto } from '@shared/dtos/unauthorized-response.dto';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { UpdateExpenseDto } from './dtos/update-expense.dto';
import { ExpenseService } from './expense.service';

@ApiTags('Expenses')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
@Controller('expenses')
@UseGuards(JwtAuthGuard)
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK })
  async findMany(
    @CurrentUserId() userId: string,
    @Query() pagination: PaginationRequestDto,
  ) {
    return this.expenseService.findMany({ userId, pagination });
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED })
  async create(
    @CurrentUserId() userId: string,
    @Body() data: CreateExpenseDto,
  ): Promise<void> {
    return this.expenseService.create(userId, data);
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK })
  async update(@Param('id') id: string, @Body() data: UpdateExpenseDto) {
    return this.expenseService.update(id, data);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.expenseService.remove(id);
  }

  @Patch()
  @ApiResponse({ status: HttpStatus.OK })
  async resetPaymentStatus() {
    return this.expenseService.resetPaymentStatus();
  }
}
