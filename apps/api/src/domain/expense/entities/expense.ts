export class Expense {
  id: string;
  userId: string;
  title: string;
  dueDay: number;
  imageUrl?: string;
  isPaid: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
