import { useState } from "react";

import { User } from "../../../interfaces/user";
import { useUserStore } from "../../../stores/user";
import ModalUpdateProfile from "./components/ModalUpdateProfile";
import { ProfileImageWithMenu } from "./components/ProfileImageWithMenu";

interface NavbarProps {
  user: User | null;
}

export function Navbar({ user }: NavbarProps) {
  const { logoutUser } = useUserStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignOut = () => {
    logoutUser();
    location.reload();
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  return (
    <nav className="flex justify-between py-8 px-5 items-center bg-primary md:pl-28 lg:pl-64">
      <div className="flex gap-6">
        <ProfileImageWithMenu onLogout={handleSignOut} onEdit={handleEdit} />

        <div>
          <h3 className="text-gray-200">Welcome</h3>
          <h2 className="text-lg font-semibold text-white">{user?.name}</h2>
        </div>
      </div>

      <ModalUpdateProfile
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </nav>
  );
}
