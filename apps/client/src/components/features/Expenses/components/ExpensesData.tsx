import { IExpense } from '../../../../interfaces/expense';
import { LoaderSpinner } from '../../../common/Loader';
import { Expense } from './Expense';

interface ExpensesDataProps {
  expenses: IExpense[] | null;
  isLoading: boolean;
}

export default function ExpensesData({
  isLoading,
  expenses
}: ExpensesDataProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-4">
        <LoaderSpinner
          width={50}
          height={50}
          primaryColor="#2757a3"
          secondaryColor="#95b8f0"
        />
      </div>
    );
  }

  return (
    <ul>
      {expenses?.map((expense) => (
        <Expense key={expense.id} expense={expense} />
      ))}
    </ul>
  );
}
