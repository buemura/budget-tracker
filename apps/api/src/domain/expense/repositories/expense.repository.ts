import { CreateExpenseDto } from '../../../api/expense/dtos/create-expense.dto';
import { UpdateExpenseDto } from '../../../api/expense/dtos/update-expense.dto';
import { Expense } from '../entities/expense';

export abstract class ExpenseRepository {
  abstract findMany(): Promise<Expense[]>;
  abstract findById(id: string): Promise<Expense>;
  abstract findByUserId(userId: string): Promise<Expense[]>;
  abstract create(data: CreateExpenseDto): Promise<Expense>;
  abstract update(id: string, data: UpdateExpenseDto): Promise<Expense>;
  abstract updateAll(): Promise<void>;
  abstract remove(id: string): Promise<Expense>;
}
