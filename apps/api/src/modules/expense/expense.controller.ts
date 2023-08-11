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
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
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
  async findAll() {
    return this.expenseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.expenseService.findOne(id);
  }

  @Post()
  async create(@Body() data: CreateExpenseDto) {
    return this.expenseService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateExpenseDto) {
    return this.expenseService.update(id, data);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.expenseService.remove(id);
  }

  @Patch()
  async resetPaymentStatus() {
    return this.expenseService.resetPaymentStatus();
  }
}
