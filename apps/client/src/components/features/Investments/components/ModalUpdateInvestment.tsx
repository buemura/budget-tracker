import { useState } from "react";

import { IInvestment } from "../../../../interfaces/investment";
import { investmentService } from "../../../../services/http/investment-service";
import { useUserStore } from "../../../../stores/user";
import { Modal } from "../../../common/Modal";
import { ModalInput } from "../../../common/Modal/Input";
import { MESSAGES } from "../helpers/messages";

interface ModalUpdateInvestmentProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  investment: IInvestment;
}

export function ModalUpdateInvestment({
  isModalOpen,
  setIsModalOpen,
  investment,
}: ModalUpdateInvestmentProps) {
  const { user } = useUserStore();

  const [isLoading, setIsLoading] = useState(false);
  // TODO: adds account state
  // const [isActive, setIsActive] = useState(investment.accountId);
  const [category, setCategory] = useState(investment.category);
  const [ticker, setTicker] = useState(investment.ticker);
  const [type, setType] = useState(investment.type);

  const handleSave = async () => {
    setIsLoading(true);

    await investmentService.update({
      userId: user?.id || "",
      investmentId: investment.id,
      accountId: "",
      category,
      ticker,
      type,
      accessToken: user?.accessToken || "",
    });

    setIsModalOpen(false);
    setIsLoading(false);
    location.reload();
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <Modal
      title={MESSAGES.MODAL_UPDATE_TITLE}
      onCancel={() => setIsModalOpen(false)}
      onSave={handleSave}
      isLoading={isLoading}
      inputs={[
        // TODO: adds account input
        // {
        //   input: (
        //     <ModalInput
        //       labelText="Account"
        //       inputId="investment-account"
        //       inputType="text"
        //       value={category}
        //       onChangeValue={setCategory}
        //     />
        //   ),
        // },
        {
          input: (
            <ModalInput
              labelText="Category"
              inputId="investment-category"
              inputType="text"
              value={category}
              onChangeValue={setCategory}
            />
          ),
        },
        {
          input: (
            <ModalInput
              labelText="Ticker"
              inputId="investment-ticker"
              inputType="text"
              value={ticker}
              onChangeValue={setTicker}
            />
          ),
        },
        {
          input: (
            <ModalInput
              labelText="Type"
              inputId="investment-type"
              inputType="text"
              value={type}
              onChangeValue={setType}
            />
          ),
        },
      ]}
    />
  );
}
