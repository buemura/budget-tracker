import { useState } from "react";
import { FormattedDate, FormattedNumber } from "react-intl";

import { IAccount } from "../../../../interfaces/account";
import { usePreferenceStore } from "../../../../stores/preferences";
import ModalUpdateAccount from "./ModalUpdateAccount";

interface AccountProps {
  account: IAccount;
}

export default function Account({ account }: AccountProps) {
  const { balanceVisible } = usePreferenceStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <li>
      <div
        className="flex justify-between items-center border-b border-gray-200 p-2 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-center gap-2">
          <img
            className="rounded-full border-2 border-gray-300 w-9 h-9"
            src={
              account.icon ||
              "https://www.caltrain.com/files/images/2021-09/default.jpg"
            }
            alt="expense"
            referrerPolicy="no-referrer"
          />

          <div className="flex flex-col">
            <span className="text-base">{account.name}</span>
            <span className="text-sm text-gray-500 md:font-semibold">
              <FormattedDate
                value={account.updatedAt}
                year="numeric"
                month="short"
                day="2-digit"
              />
            </span>
          </div>
        </div>

        <div className="flex items-end gap-3">
          {balanceVisible ? (
            <span className="text-base font-semibold py-1 text-primary-text">
              <FormattedNumber
                value={account.balance}
                style="currency"
                currency="BRL"
              />
            </span>
          ) : (
            <span className="text-base font-semibold py-1 text-primary-text">
              R$ •••••
            </span>
          )}
        </div>
      </div>

      <ModalUpdateAccount
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        account={account}
      />
    </li>
  );
}
