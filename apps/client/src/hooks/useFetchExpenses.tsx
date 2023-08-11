import { useEffect, useState } from "react";

import { EXPENSES_DEFAULT_PAGINATION } from "@helpers/constants";
import { IExpense } from "@interfaces/expense";
import { expenseService } from "@services/http/expense-service";
import { IUseFetchProps } from "./types";

export const useFetchExpenses = ({ user, page, items }: IUseFetchProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [expenses, setExpenses] = useState<IExpense[] | null>([]);

  const fetchExpenses = async () => {
    const pagination = {
      page: page || EXPENSES_DEFAULT_PAGINATION.PAGE,
      items: items || EXPENSES_DEFAULT_PAGINATION.ITEMS,
    };

    try {
      setIsLoading(true);
      const result = await expenseService.fetchAll({
        userId: user?.id || "",
        accessToken: user?.accessToken || "",
        pagination,
      });
      setIsLoading(false);
      setExpenses(result);
    } catch (error) {
      setHasError(true);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return { expenses, isLoading, hasError };
};
