export interface ICreateExpense {
  userId: string;
  title: string;
  imageUrl?: string;
}

export interface IUpdateExpense {
  userId: string;
  title?: string;
  imageUrl?: string;
}
