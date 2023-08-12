import { Injectable } from '@nestjs/common';

import { CreateExpenseDto } from '@api/expense/dtos/create-expense.dto';
import { UpdateExpenseDto } from '@api/expense/dtos/update-expense.dto';
import { Expense } from '@domain/expense/entities/expense';
import { ExpenseRepository } from '@domain/expense/repositories/expense.repository';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaExpenseRepository implements ExpenseRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(): Promise<Expense[]> {
    return this.prisma.expense.findMany();
  }

  async findById(id: string): Promise<Expense> {
    return this.prisma.expense.findFirst({
      where: { id },
    });
  }

  async findByUserId(userId: string): Promise<Expense[]> {
    return this.prisma.expense.findMany({
      where: { userId },
    });
  }

  async create(data: CreateExpenseDto): Promise<Expense> {
    return this.prisma.expense.create({
      data: {
        userId: data.userId,
        title: data.title,
        imageUrl: data.imageUrl,
      },
    });
  }

  async update(id: string, data: UpdateExpenseDto): Promise<Expense> {
    return this.prisma.expense.update({
      where: { id },
      data,
    });
  }

  async updateAll(): Promise<void> {
    await this.prisma.expense.updateMany({
      where: { isPaid: true },
      data: {
        isPaid: false,
      },
    });
  }

  async remove(id: string): Promise<Expense> {
    return this.prisma.expense.delete({
      where: { id },
    });
  }
}
