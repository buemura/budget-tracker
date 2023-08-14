import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";

import { defaultPagination } from "../../../helpers/pagination";
import { investmentService } from "../../../services/http/investment-service";
import { useUserStore } from "../../../stores/user";
import { Collapsable } from "../../common/Collapsable";
import { LoaderSpinner } from "../../common/Loader";
import InvestmentsData from "./components/InvestmentsData";
import { ModalNewInvestment } from "./components/ModalNewInvestment";
import { MESSAGES } from "./utils/messages";
import { useFetchInvestments } from "./hooks/useFetchInvestments";

export function Investments() {
  const { user } = useUserStore();

  const [pagination] = useState(defaultPagination);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPriceUpdateLoading, setIsPriceUpdateLoading] = useState(false);

  const { data, isLoading } = useFetchInvestments(user, pagination);

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

      <InvestmentsData isLoading={isLoading} investments={data} />

      <ModalNewInvestment
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Collapsable>
  );
}
