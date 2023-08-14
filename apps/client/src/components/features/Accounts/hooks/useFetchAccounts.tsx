import { useQuery } from "react-query";

import { User } from "../../../../interfaces/user";
import { ACCOUNTS_DEFAULT_PAGINATION } from "../../../../helpers/constants";
import { PaginationMetadata } from "../../../../interfaces/pagination";
import { accountService } from "../../../../services/http/account-service";

const fetchAccounts = async (
  accessToken: string | null | undefined,
  pagination: PaginationMetadata
) => {
  return accountService.fetchMany({
    accessToken: accessToken || "",
    pagination: {
      page: pagination.page || ACCOUNTS_DEFAULT_PAGINATION.PAGE,
      items: pagination.items || ACCOUNTS_DEFAULT_PAGINATION.ITEMS,
    },
  });
};

export const useFetchAccounts = (
  user: User | null,
  pagination: PaginationMetadata
) => {
  const { data, isLoading, isError } = useQuery("accounts", () =>
    fetchAccounts(user?.accessToken, pagination)
  );
  return { data, isLoading, isError };
};
