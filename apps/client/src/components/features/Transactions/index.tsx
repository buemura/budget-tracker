import { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { FcBarChart } from "react-icons/fc";

import { Modal } from "@components/common/Modal";
import { ModalInput } from "@components/common/Modal/Input";
import { useUserStore } from "@stores/user";

export function Transactions() {
  const { user } = useUserStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [title, setTitle] = useState("");

  const handleSaveNew = () => {
    setIsModalOpen(false);
    console.log("save new transaction");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    console.log("cancel new transaction");
  };

  return (
    <div className="flex flex-col bg-white m-4 p-4 rounded-lg md:mx-28 lg:mx-64">
      <div className="flex justify-between">
        <span className="flex items-center gap-2 font-semibold text-sm">
          <FcBarChart /> My transactions
        </span>
        <AiFillPlusCircle
          className="text-2xl cursor-pointer text-blue-600 hover:text-blue-700"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      <div className="mt-4">
        <table className="bg-gray-100 block overflow-auto">
          <tr className="text-sm font-thin border-b">
            <th>Title</th>
            <th>From</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Is Recurrent</th>
            <th>Payment Method</th>
            <th>Bank</th>
          </tr>
          <tr className="text-sm font-thin border-b">
            <td>Fatura Nubank</td>
            <td>Nubank</td>
            <td>Misc</td>
            <td>-884,04</td>
            <td>yes</td>
            <td>BOLETO</td>
            <td>PicPay</td>
          </tr>
        </table>
      </div>

      {isModalOpen && (
        <Modal
          title="New Transaction"
          inputs={[
            {
              input: (
                <ModalInput
                  labelText="Transaction Title"
                  inputId="transaction-title-new"
                  inputType="text"
                  value={title}
                  onChangeValue={setTitle}
                />
              ),
            },
          ]}
          onCancel={handleCancel}
          onSave={handleSaveNew}
          isLoading={isSaveLoading}
        />
      )}
    </div>
  );
}
