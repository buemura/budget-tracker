import { Injectable } from '@nestjs/common';

import { CreateExpenseDto } from './dtos/create-expense.dto';
import { UpdateExpenseDto } from './dtos/update-expense.dto';

@Injectable()
export class ExpenseService {
  async create(data: CreateExpenseDto) {
    return 'This action adds a new expense';
  }

  async findAll() {
    return `This action returns all expense`;
  }

  async findOne(id: string) {
    return `This action returns a #${id} expense`;
  }

  async update(id: string, data: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  async resetPaymentStatus() {
    return `This action expense`;
  }

  async remove(id: string) {
    return `This action removes a #${id} expense`;
  }
}
