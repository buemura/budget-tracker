import { useState } from 'react';
import { useQuery } from 'react-query';

import { Expenses } from '../../components/features/Expenses';
import { Navbar } from '../../components/features/Navbar';
import { useCheckAuth } from '../../hooks/useCheckAuth';
// import { useFetchInvestments } from '../../hooks/useFetchInvestments';
import { Accounts } from '../../components/features/Accounts';
import { useUserStore } from '../../stores/user';
import { fetchAccounts } from './utils/fetchAccounts';
import { fetchExpenses } from './utils/fetchExpenses';

export default function Home() {
  const { user, logoutUser } = useUserStore();
  const { hasError } = useCheckAuth(user);

  if (hasError) {
    logoutUser();
  }

  const defaultPag = {
    page: 1,
    items: 10
  };

  const [expensesPagination, setExpensesPagination] = useState(defaultPag);
  const [accountsPagination, setAccountsPagination] = useState(defaultPag);
  // const [investmentsPagination, setInvestmentsPagination] =
  //   useState(defaultPag);

  const { data: expenses, isLoading: isExpensesLoading } = useQuery(
    'expenses',
    () => fetchExpenses(user?.accessToken, expensesPagination)
  );

  const { data: accounts, isLoading: isAccountsLoading } = useQuery(
    'accounts',
    () => fetchAccounts(user?.accessToken, accountsPagination)
  );

  // const { investments, isLoading: isInvestmentsLoading } = useFetchInvestments({
  //   user,
  //   page: investmentsPagination.page,
  //   items: investmentsPagination.items
  // });

  return (
    <div className="min-w-screen min-h-screen bg-gray-100">
      <Navbar user={user} />

      <div className="flex flex-col p-2">
        <Expenses
          expenses={expenses}
          isLoading={isExpensesLoading}
          pagination={expensesPagination}
          setPagination={setExpensesPagination}
        />
        <Accounts
          accounts={accounts}
          isLoading={isAccountsLoading}
          pagination={accountsPagination}
          setPagination={setAccountsPagination}
        />
        {/* <Investments
          investments={investments}
          isLoading={isInvestmentsLoading}
          pagination={investmentsPagination}
          setPagination={setInvestmentsPagination}
        /> */}
        {/* <Transactions /> */}
      </div>
    </div>
  );
}
