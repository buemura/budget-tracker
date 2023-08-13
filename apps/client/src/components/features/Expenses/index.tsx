import { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { useQuery } from 'react-query';

import { defaultPagination } from '../../../helpers/pagination';
import { useUserStore } from '../../../stores/user';
import { Collapsable } from '../../common/Collapsable';
import ExpensesData from './components/ExpensesData';
import ModalNewExpense from './components/ModalNewExpense';
import { fetchExpenses } from './utils/fetchExpenses';

export function Expenses() {
  const { user } = useUserStore();

  const [pagination] = useState(defaultPagination);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useQuery('expenses', () =>
    fetchExpenses(user?.accessToken, pagination)
  );

  return (
    <Collapsable title="My recurrent expenses">
      <div className="flex justify-end">
        <FaPlusCircle
          className="my-4 text-2xl cursor-pointer text-blue-600 hover:text-blue-700"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <ExpensesData isLoading={isLoading} expenses={data} />

      <ModalNewExpense
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Collapsable>
  );
}
