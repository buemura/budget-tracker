import { useState } from "react";

import { Modal } from "@components/common/Modal";
import { ModalInput } from "@components/common/Modal/Input";
import { accountService } from "@services/http/account-service";
import { useUserStore } from "@stores/user";

interface ModalNewAccountProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

export default function ModalNewAccount({
  isModalOpen,
  setIsModalOpen,
}: ModalNewAccountProps) {
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [balance, setBalance] = useState(1);
  const [icon, setIcon] = useState("");

  const handleSaveNew = async () => {
    setIsLoading(true);

    await accountService.create({
      userId: user?.id || "",
      name: name,
      balance: balance,
      icon: icon,
      accessToken: user?.accessToken || "",
    });

    setIsModalOpen(false);
    setIsLoading(false);
    location.reload();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <Modal
      title="New Account"
      inputs={[
        {
          input: (
            <ModalInput
              labelText="Name"
              inputId="account-name-new"
              inputType="text"
              value={name}
              onChangeValue={setName}
            />
          ),
        },
        {
          input: (
            <ModalInput
              labelText="Balance"
              inputId="account-balance-new"
              inputType="number"
              value={balance}
              onChangeValue={setBalance}
            />
          ),
        },
        {
          input: (
            <ModalInput
              labelText="Icon"
              inputId="account-icon-new"
              inputType="text"
              value={icon}
              onChangeValue={setIcon}
            />
          ),
        },
      ]}
      onCancel={handleCancel}
      onSave={handleSaveNew}
      isLoading={isLoading}
    />
  );
}
