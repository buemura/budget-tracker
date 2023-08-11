import { useEffect, useState } from 'react';

import { ACCOUNTS_DEFAULT_PAGINATION } from '../helpers/constants';
import { IAccounts } from '../interfaces/account';
import { accountService } from '../services/http/account-service';
import { IUseFetchProps } from './types';

export const useFetchAccounts = ({ user, page, items }: IUseFetchProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [accounts, setAccounts] = useState<IAccounts | null>(null);

  const fetchAccounts = async () => {
    const pagination = {
      page: page || ACCOUNTS_DEFAULT_PAGINATION.PAGE,
      items: items || ACCOUNTS_DEFAULT_PAGINATION.ITEMS
    };

    try {
      setIsLoading(true);
      const result = await accountService.fetchAll({
        userId: user?.id || '',
        accessToken: user?.accessToken || '',
        pagination
      });
      setIsLoading(false);
      setAccounts(result);
    } catch (error) {
      setHasError(true);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return { accounts, isLoading, hasError };
};
