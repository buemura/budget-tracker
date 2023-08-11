import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

import { Collapsable } from "@components/common/Collapsable";
import { IExpense } from "@interfaces/expense";
import { PaginationMetadata } from "@interfaces/pagination";
import ExpensesData from "./components/ExpensesData";
import ModalNewExpense from "./components/ModalNewExpense";

interface ExpensesProps {
  expenses: IExpense[] | null;
  isLoading: boolean;
  pagination: PaginationMetadata;
  setPagination: (data: PaginationMetadata) => void;
}

export function Expenses({
  expenses,
  isLoading,
  pagination,
  setPagination,
}: ExpensesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Collapsable title="My recurrent expenses">
      <div className="flex justify-end">
        <FaPlusCircle
          className="my-4 text-2xl cursor-pointer text-blue-600 hover:text-blue-700"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <ExpensesData isLoading={isLoading} expenses={expenses} />

      <ModalNewExpense
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Collapsable>
  );
}
