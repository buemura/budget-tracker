import { EXPENSES_DEFAULT_PAGINATION } from '../../../../helpers/constants';
import { PaginationMetadata } from '../../../../interfaces/pagination';
import { investmentService } from '../../../../services/http/investment-service';

export const fetchInvestments = async (
  accessToken: string | null | undefined,
  pagination: PaginationMetadata
) => {
  return investmentService.fetchMany({
    accessToken: accessToken || '',
    pagination: {
      page: pagination.page || EXPENSES_DEFAULT_PAGINATION.PAGE,
      items: pagination.items || EXPENSES_DEFAULT_PAGINATION.ITEMS
    }
  });
};
