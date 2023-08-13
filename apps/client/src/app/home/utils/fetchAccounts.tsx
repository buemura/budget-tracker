import { ACCOUNTS_DEFAULT_PAGINATION } from '../../../helpers/constants';
import { PaginationMetadata } from '../../../interfaces/pagination';
import { accountService } from '../../../services/http/account-service';

export const fetchAccounts = async (
  accessToken: string | null | undefined,
  pagination: PaginationMetadata
) => {
  return accountService.fetchMany({
    accessToken: accessToken || '',
    pagination: {
      page: pagination.page || ACCOUNTS_DEFAULT_PAGINATION.PAGE,
      items: pagination.items || ACCOUNTS_DEFAULT_PAGINATION.ITEMS
    }
  });
};
