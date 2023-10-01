export interface ICreateExpense {
  userId: string;
  title: string;
  dueDay: number;
  imageUrl?: string;
}

export interface IUpdateExpense {
  userId: string;
  title?: string;
  dueDay?: number;
  imageUrl?: string;
}
