import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FormattedNumber } from 'react-intl';

import { usePreferenceStore } from '../../../../stores/preferences';

interface TotalBalanceProps {
  totalBalance: number;
}

export default function TotalBalance({ totalBalance }: TotalBalanceProps) {
  const { balanceVisible, changeBalanceVisible } = usePreferenceStore();

  return (
    <div className="flex justify-between items-center border-l-4 border-blue-500 pl-2 mb-2">
      <div className="flex flex-col">
        <span className="text-base">Total balance</span>

        {balanceVisible ? (
          <span className="font-semibold text-blue-800">
            <FormattedNumber
              value={totalBalance}
              style="currency"
              currency="BRL"
            />
          </span>
        ) : (
          <span className="font-semibold text-blue-800">R$ •••••</span>
        )}
      </div>

      {balanceVisible ? (
        <AiOutlineEye
          className="text-2xl text-gray-500 cursor-pointer"
          onClick={() => changeBalanceVisible()}
        />
      ) : (
        <AiOutlineEyeInvisible
          className="text-2xl text-gray-500 cursor-pointer"
          onClick={() => changeBalanceVisible()}
        />
      )}
    </div>
  );
}
