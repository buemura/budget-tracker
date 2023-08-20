import { useState } from "react";

import { defaultPagination } from "../../../helpers/pagination";
import { useUserStore } from "../../../stores/user";
import { PlusButton } from "../../common/Buttons/PlusButton";
import { Collapsable } from "../../common/Collapsable";
import ExpensesData from "./components/ExpensesData";
import ModalNewExpense from "./components/ModalNewExpense";
import { useFetchExpenses } from "./hooks/useFetchExpenses";

export function Expenses() {
  const { user } = useUserStore();

  const [pagination] = useState(defaultPagination);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useFetchExpenses(user, pagination);

  return (
    <Collapsable title="✅ Recurrent Expenses">
      <div className="flex justify-end">
        <PlusButton onClick={() => setIsModalOpen(true)} />
      </div>

      <ExpensesData isLoading={isLoading} expenses={data} />

      <ModalNewExpense
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Collapsable>
  );
}
