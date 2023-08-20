import { useState } from "react";

import { userService } from "../../../../services/http/user-service";
import { useUserStore } from "../../../../stores/user";
import { Modal } from "../../../common/Modal";
import { ModalInput } from "../../../common/Modal/Input";

interface ModalUpdateProfileProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}

export default function ModalUpdateProfile({
  isModalOpen,
  setIsModalOpen,
}: ModalUpdateProfileProps) {
  const { user, setUser } = useUserStore();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState<string | undefined>(user?.name);
  const [profilePicture, setProfilePicture] = useState<string | undefined>(
    user?.profilePicture
  );

  const handleSave = async () => {
    setIsLoading(true);

    const updatedUser = await userService.updateUser({
      name,
      profilePicture,
      accessToken: user?.accessToken || "",
    });

    setUser({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      profilePicture: updatedUser.profilePicture,
      isAuthenticated: true,
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
      title="Update User"
      onCancel={() => setIsModalOpen(false)}
      onSave={handleSave}
      isLoading={isLoading}
      inputs={[
        {
          input: (
            <ModalInput
              labelText="Name"
              inputId="user-name"
              inputType="text"
              value={name}
              onChangeValue={setName}
            />
          ),
        },
        {
          input: (
            <ModalInput
              labelText="Image"
              inputId="expense-image"
              inputType="text"
              value={profilePicture}
              onChangeValue={setProfilePicture}
            />
          ),
        },
      ]}
    />
  );
}
