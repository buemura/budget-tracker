export interface ICreateAccount {
  userId: string;
  name: string;
  balance?: number;
  icon?: string;
}

export interface IUpdateAccount {
  name?: string;
  balance?: number;
  icon?: string;
}
