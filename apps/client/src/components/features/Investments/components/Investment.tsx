import { useState } from "react";

import { formatDate } from "@helpers/date";
import { IInvestment } from "@interfaces/investment";
import { FormattedNumber } from "react-intl";
import { ModalUpdateInvestment } from "./ModalUpdateInvestment";

interface InvestmentProps {
  investment: IInvestment;
}

export function Investment({ investment }: InvestmentProps) {
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
            src={"https://www.caltrain.com/files/images/2021-09/default.jpg"}
            alt="investment"
            referrerPolicy="no-referrer"
          />

          <div className="flex flex-col">
            <span className="text-base">{investment.ticker}</span>
            <span className="text-sm text-gray-500 md:font-semibold">
              {formatDate(new Date())}
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="text-base">
            <span className="text-neutral-600 text-sm">Price: </span>
            {investment.ticker.includes("SA") ? (
              <FormattedNumber
                value={investment.pricePerQuantity}
                style="currency"
                currency="BRL"
              />
            ) : (
              <FormattedNumber
                value={investment.pricePerQuantity}
                style="currency"
                currency="USD"
              />
            )}
          </div>

          <div className="text-base">
            <span className="text-neutral-600 text-sm">Quantity: </span>
            <span>{investment.totalQuantity}</span>
          </div>
        </div>
      </div>

      <ModalUpdateInvestment
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        investment={investment}
      />
    </li>
  );
}
