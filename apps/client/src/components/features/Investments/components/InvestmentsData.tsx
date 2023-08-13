import { FormattedNumber } from 'react-intl';

import { IInvestment } from '../../../../interfaces/investment';
import { LoaderSpinner } from '../../../common/Loader';

interface InvestmentsDataProps {
  investments: IInvestment[] | null | undefined;
  isLoading: boolean;
}

export default function InvestmentsData({
  isLoading,
  investments
}: InvestmentsDataProps) {
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
    <div className="overflow-x-scroll overflow-y-scroll">
      <table className="w-full table-auto text-sm">
        <thead className="overflow-x-scroll bg-neutral-300">
          <tr>
            <th className="border border-neutral-100 text-neutral-800 text-start pl-1">
              Ticker
            </th>
            <th className="border border-neutral-100 text-neutral-800 text-start pl-1">
              Category
            </th>
            <th className="border border-neutral-100 text-neutral-800 text-start pl-1">
              Type
            </th>
            <th className="border border-neutral-100 text-neutral-800 text-start pl-1">
              Total Qty
            </th>
            <th className="border border-neutral-100 text-neutral-800 text-start pl-1">
              Total Paid
            </th>
            <th className="border border-neutral-100 text-neutral-800 text-start pl-1">
              Market Price
            </th>
            <th className="border border-neutral-100 text-neutral-800 text-start pl-1">
              Total Market Price
            </th>
          </tr>
        </thead>

        <tbody className="overflow-x-scroll">
          {investments?.map((investment) => (
            <tr>
              <td className="border border-neutral-300 pl-1">
                {investment.ticker}
              </td>
              <td className="border border-neutral-300 pl-1">
                {investment.category}
              </td>
              <td className="border border-neutral-300 pl-1">
                {investment.type}
              </td>
              <td className="border border-neutral-300 pl-1">
                <FormattedNumber
                  value={investment.totalQuantity}
                  style="unit"
                />
              </td>
              <td className="border border-neutral-300 pl-1">
                <FormattedNumber
                  value={investment.totalPaidPrice}
                  style="currency"
                  currency={investment.ticker.includes('SA') ? 'BRL' : 'USD'}
                />
              </td>
              <td className="border border-neutral-300 pl-1">
                <FormattedNumber
                  value={investment.pricePerQuantity}
                  style="currency"
                  currency={investment.ticker.includes('SA') ? 'BRL' : 'USD'}
                />
              </td>
              <td className="border border-neutral-300 pl-1">
                <FormattedNumber
                  value={investment.totalPrice}
                  style="currency"
                  currency={investment.ticker.includes('SA') ? 'BRL' : 'USD'}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
