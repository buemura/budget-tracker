import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

import { defaultPagination } from "../../../helpers/pagination";
import { useUserStore } from "../../../stores/user";
import { Collapsable } from "../../common/Collapsable";
import AccountsData from "./components/AccountsData";
import ModalNewAccount from "./components/ModalNewAccount";
import TotalBalance from "./components/TotalBalance";
import { useFetchAccounts } from "./hooks/useFetchAccounts";

export function Accounts() {
  const { user } = useUserStore();

  const [pagination] = useState(defaultPagination);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useFetchAccounts(user, pagination);

  return (
    <Collapsable title="🏦 Accounts">
      <div className="flex justify-end">
        <FaPlusCircle
          className="my-4 text-2xl cursor-pointer text-blue-600 hover:text-blue-700"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <TotalBalance totalBalance={data?.totalBalance || 0} />
      <div className="border border-gray-100 mb-4" />

      <AccountsData isLoading={isLoading} accounts={data} />

      <ModalNewAccount
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Collapsable>
  );
}
