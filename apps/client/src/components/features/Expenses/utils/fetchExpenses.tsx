import { EXPENSES_DEFAULT_PAGINATION } from '../../../../helpers/constants';
import { PaginationMetadata } from '../../../../interfaces/pagination';
import { expenseService } from '../../../../services/http/expense-service';

export const fetchExpenses = async (
  accessToken: string | null | undefined,
  pagination: PaginationMetadata
) => {
  return expenseService.fetchMany({
    accessToken: accessToken || '',
    pagination: {
      page: pagination.page || EXPENSES_DEFAULT_PAGINATION.PAGE,
      items: pagination.items || EXPENSES_DEFAULT_PAGINATION.ITEMS
    }
  });
};
