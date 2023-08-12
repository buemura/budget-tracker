import { useState } from 'react';

import { Expenses } from '../../components/features/Expenses';
import { Navbar } from '../../components/features/Navbar';
import { useCheckAuth } from '../../hooks/useCheckAuth';
import { useFetchAccounts } from '../../hooks/useFetchAccounts';
import { useFetchExpenses } from '../../hooks/useFetchExpenses';
// import { useFetchInvestments } from '../../hooks/useFetchInvestments';
import { Accounts } from '../../components/features/Accounts';
import { useUserStore } from '../../stores/user';

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

  const { expenses, isLoading: isExpensesLoading } = useFetchExpenses({
    user,
    page: expensesPagination.page,
    items: expensesPagination.items
  });
  const { accounts, isLoading: isAccountsLoading } = useFetchAccounts({
    user,
    page: accountsPagination.page,
    items: accountsPagination.items
  });
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
