import { investmentService } from "@services/http/investment-service";
import { useUserStore } from "@stores/user";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";

import { IInvestment } from "../../../interfaces/investment";
import { PaginationMetadata } from "../../../interfaces/pagination";
import { Collapsable } from "../../common/Collapsable";
import { LoaderSpinner } from "../../common/Loader";
import InvestmentsData from "./components/InvestmentsData";
import { ModalNewInvestment } from "./components/ModalNewInvestment";
import { MESSAGES } from "./helpers/messages";

interface InvestmentsProps {
  investments: IInvestment[] | null;
  isLoading: boolean;
  pagination: PaginationMetadata;
  setPagination: (data: PaginationMetadata) => void;
}

export function Investments({
  investments,
  isLoading,
  pagination,
  setPagination,
}: InvestmentsProps) {
  const { user } = useUserStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPriceUpdateLoading, setIsPriceUpdateLoading] = useState(false);

  const handleInvestmentsPricesUpdate = async () => {
    setIsPriceUpdateLoading(true);

    await investmentService.updatePrices({
      userId: user?.id ?? "",
      accessToken: user?.accessToken ?? "",
    });

    setIsPriceUpdateLoading(false);
    location.reload();
  };

  return (
    <Collapsable title={MESSAGES.CONTAINER_TITLE}>
      <div className="flex items-center justify-end gap-3">
        {isPriceUpdateLoading ? (
          <LoaderSpinner
            width={25}
            height={25}
            strokeWidth={8}
            strokeWidthSecondary={8}
            primaryColor="#2752d6"
            secondaryColor="#5a81fa"
          />
        ) : (
          <FiRefreshCw
            className="my-4 text-2xl cursor-pointer text-blue-600 hover:text-blue-700"
            onClick={handleInvestmentsPricesUpdate}
          />
        )}

        <FaPlusCircle
          className="my-4 text-2xl cursor-pointer text-blue-600 hover:text-blue-700"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <InvestmentsData isLoading={isLoading} investments={investments} />

      <ModalNewInvestment
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Collapsable>
  );
}
