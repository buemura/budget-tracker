export interface IAccounts {
  accounts: IAccount[];
  totalBalance: number;
  metricsData: IAccountMetricsData[];
}

export interface IAccount {
  id: string;
  userId: string;
  name: string;
  balance: number;
  icon: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAccountMetricsData {
  name: string;
  balance: number;
}
