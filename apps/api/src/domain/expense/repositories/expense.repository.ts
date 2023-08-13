import { Expense } from '../entities/expense';
import {
  ICreateExpense,
  IUpdateExpense,
} from '../interfaces/expense.interface';

export abstract class ExpenseRepository {
  abstract findMany(): Promise<Expense[]>;
  abstract findById(id: string): Promise<Expense>;
  abstract findByUserId(userId: string): Promise<Expense[]>;
  abstract create(data: ICreateExpense): Promise<Expense>;
  abstract update(id: string, data: IUpdateExpense): Promise<Expense>;
  abstract updateAll(): Promise<void>;
  abstract remove(id: string): Promise<Expense>;
}
