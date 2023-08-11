import { useState } from "react";

import { investmentService } from "../../../../services/http/investment-service";
import { useUserStore } from "../../../../stores/user";
import { Modal } from "../../../common/Modal";
import { ModalInput } from "../../../common/Modal/Input";
import { MESSAGES } from "../helpers/messages";

interface ModalNewInvestmentProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

export function ModalNewInvestment({
  isModalOpen,
  setIsModalOpen,
}: ModalNewInvestmentProps) {
  const { user } = useUserStore();

  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [ticker, setTicker] = useState("");
  const [type, setType] = useState("");

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSaveNew = async () => {
    setIsSaveLoading(true);

    await investmentService.create({
      userId: user?.id || "",
      accountId: "",
      category,
      ticker,
      type,
      accessToken: user?.accessToken || "",
    });

    setIsModalOpen(false);
    setIsSaveLoading(false);
    location.reload();
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <Modal
      title={MESSAGES.MODAL_NEW_TITLE}
      inputs={[
        {
          input: (
            <ModalInput
              labelText="Category"
              inputId="investment-category-new"
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
              inputId="investment-ticker-new"
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
              inputId="investment-type-new"
              inputType="text"
              value={type}
              onChangeValue={setType}
            />
          ),
        },
      ]}
      onCancel={handleCancel}
      onSave={handleSaveNew}
      isLoading={isSaveLoading}
    />
  );
}
