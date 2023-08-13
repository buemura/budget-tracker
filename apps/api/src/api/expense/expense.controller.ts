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

import { JwtAuthGuard } from '@api/auth/guards/jwt-auth.guard';
import {
  CreateExpenseUsecase,
  GetExpensesByUserUsecase,
  RemoveExpenseUsecase,
  ResetExpensesPaymentStatusUsecase,
  UpdateExpenseUsecase,
} from '@application/expense';
import { PaginationRequestDto } from '@helpers/pagination/dto-transformer';
import { CurrentUserId } from '@shared/decorators/current-user.decorator';
import { UnauthorizedResponseDto } from '@shared/dtos/unauthorized-response.dto';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { UpdateExpenseDto } from './dtos/update-expense.dto';

@ApiTags('Expenses')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ type: UnauthorizedResponseDto })
@Controller('expenses')
@UseGuards(JwtAuthGuard)
export class ExpenseController {
  constructor(
    private readonly getExpensesByUserUsecase: GetExpensesByUserUsecase,
    private readonly createExpenseUsecase: CreateExpenseUsecase,
    private readonly updateExpenseUsecase: UpdateExpenseUsecase,
    private readonly resetExpensesPaymentStatusUsecase: ResetExpensesPaymentStatusUsecase,
    private readonly removeExpenseUsecase: RemoveExpenseUsecase,
  ) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK })
  async findMany(
    @CurrentUserId() userId: string,
    @Query() pagination: PaginationRequestDto,
  ) {
    return this.getExpensesByUserUsecase.execute({ userId, pagination });
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED })
  async create(
    @CurrentUserId() userId: string,
    @Body() data: CreateExpenseDto,
  ): Promise<void> {
    return this.createExpenseUsecase.execute(userId, data);
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK })
  async update(
    @Param('id') id: string,
    @Body() data: UpdateExpenseDto,
  ): Promise<void> {
    return this.updateExpenseUsecase.execute(id, data);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.removeExpenseUsecase.execute(id);
  }

  @Patch()
  @ApiResponse({ status: HttpStatus.OK })
  async resetPaymentStatus() {
    return this.resetExpensesPaymentStatusUsecase.execute();
  }
}
