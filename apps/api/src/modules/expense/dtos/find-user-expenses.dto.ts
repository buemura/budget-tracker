import { PaginationQueryParams } from '@helpers/pagination/types';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export interface FindUserExpensesDto {
  userId: string;
  pagination?: PaginationQueryParams;
}

export class FindManyExpensesQueryParams {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  items?: number;
}
