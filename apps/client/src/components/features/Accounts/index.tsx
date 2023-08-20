import { useState } from "react";

import { defaultPagination } from "../../../helpers/pagination";
import { useUserStore } from "../../../stores/user";
import { PlusButton } from "../../common/Buttons/PlusButton";
import { Collapsable } from "../../common/Collapsable";
import { AccountsData } from "./components/AccountsData";
import { ModalNewAccount } from "./components/ModalNewAccount";
import { TotalBalance } from "./components/TotalBalance";
import { useFetchAccounts } from "./hooks/useFetchAccounts";

export function Accounts() {
  const { user } = useUserStore();

  const [pagination] = useState(defaultPagination);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useFetchAccounts(user, pagination);

  return (
    <Collapsable title="🏦 Accounts">
      <div className="flex justify-end">
        <PlusButton onClick={() => setIsModalOpen(true)} />
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
