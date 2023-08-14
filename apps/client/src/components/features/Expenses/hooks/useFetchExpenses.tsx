import { useQuery } from "react-query";

import { User } from "../../../../interfaces/user";
import { PaginationMetadata } from "../../../../interfaces/pagination";
import { expenseService } from "../../../../services/http/expense-service";
import { EXPENSES_DEFAULT_PAGINATION } from "../../../../helpers/constants";

const fetchExpenses = async (
  accessToken: string | null | undefined,
  pagination: PaginationMetadata
) => {
  return expenseService.fetchMany({
    accessToken: accessToken || "",
    pagination: {
      page: pagination.page || EXPENSES_DEFAULT_PAGINATION.PAGE,
      items: pagination.items || EXPENSES_DEFAULT_PAGINATION.ITEMS,
    },
  });
};

export const useFetchExpenses = (
  user: User | null,
  pagination: PaginationMetadata
) => {
  const { data, isLoading, isError } = useQuery("expenses", () =>
    fetchExpenses(user?.accessToken, pagination)
  );
  return { data, isLoading, isError };
};
