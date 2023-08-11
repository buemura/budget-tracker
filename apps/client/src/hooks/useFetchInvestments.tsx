import { useEffect, useState } from "react";

import { EXPENSES_DEFAULT_PAGINATION } from "@helpers/constants";
import { IInvestment } from "@interfaces/investment";
import { investmentService } from "@services/http/investment-service";
import { IUseFetchProps } from "./types";

export const useFetchInvestments = ({ user, page, items }: IUseFetchProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [investments, setInvestments] = useState<IInvestment[] | null>([]);

  const fetchExpenses = async () => {
    const pagination = {
      page: page || EXPENSES_DEFAULT_PAGINATION.PAGE,
      items: items || EXPENSES_DEFAULT_PAGINATION.ITEMS,
    };

    try {
      setIsLoading(true);
      const result = await investmentService.fetchAll({
        userId: user?.id || "",
        accessToken: user?.accessToken || "",
        pagination,
      });
      setIsLoading(false);
      setInvestments(result);
    } catch (error) {
      setHasError(true);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return { investments, isLoading, hasError };
};
