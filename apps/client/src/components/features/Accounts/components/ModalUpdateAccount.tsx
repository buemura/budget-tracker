import { useState } from 'react';

import { IAccount } from '../../../../interfaces/account';
import { accountService } from '../../../../services/http/account-service';
import { useUserStore } from '../../../../stores/user';
import { Modal } from '../../../common/Modal';
import { ModalInput } from '../../../common/Modal/Input';

interface ModalUpdateAccountProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  account: IAccount;
}

export default function ModalUpdateAccount({
  isModalOpen,
  setIsModalOpen,
  account
}: ModalUpdateAccountProps) {
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(account.name);
  const [balance, setBalance] = useState(account.balance);
  const [icon, setIcon] = useState(account.icon);

  const handleSave = async () => {
    setIsLoading(true);

    await accountService.update({
      userId: user?.id || '',
      accountId: account.id,
      name: name,
      balance: balance,
      icon: icon,
      accessToken: user?.accessToken || ''
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
      title="Update Account"
      onCancel={() => setIsModalOpen(false)}
      onSave={handleSave}
      isLoading={isLoading}
      inputs={[
        {
          input: (
            <ModalInput
              labelText="name"
              inputId="account-name"
              inputType="text"
              value={name}
              onChangeValue={setName}
            />
          )
        },
        {
          input: (
            <ModalInput
              labelText="Balance"
              inputId="account-balance"
              inputType="number"
              value={balance}
              onChangeValue={setBalance}
            />
          )
        },
        {
          input: (
            <ModalInput
              labelText="Icon"
              inputId="account-icon"
              inputType="text"
              value={icon}
              onChangeValue={setIcon}
            />
          )
        }
      ]}
    />
  );
}
