import { useQuery } from "react-query";

import { User } from "../../../../interfaces/user";
import { INVESTMENTS_DEFAULT_PAGINATION } from "../../../../helpers/constants";
import { PaginationMetadata } from "../../../../interfaces/pagination";
import { investmentService } from "../../../../services/http/investment-service";

const fetchInvestments = async (
  accessToken: string | null | undefined,
  pagination: PaginationMetadata
) => {
  return investmentService.fetchMany({
    accessToken: accessToken || "",
    pagination: {
      page: pagination.page || INVESTMENTS_DEFAULT_PAGINATION.PAGE,
      items: pagination.items || INVESTMENTS_DEFAULT_PAGINATION.ITEMS,
    },
  });
};

export const useFetchInvestments = (
  user: User | null,
  pagination: PaginationMetadata
) => {
  const { data, isLoading, isError } = useQuery("investments", () =>
    fetchInvestments(user?.accessToken, pagination)
  );
  return { data, isLoading, isError };
};
