export class Expense {
  id: string;
  userId: string;
  title: string;
  imageUrl?: string;
  isPaid: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
