import { PaginationQueryParams } from '@helpers/pagination/types';

export interface FindUserExpensesDto {
  userId: string;
  pagination?: PaginationQueryParams;
}
