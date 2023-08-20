import { useEffect, useRef, useState } from "react";
import { useUserStore } from "../../../../stores/user";
import { MenuOptions } from "./MenuOptions";

interface ProfileImageWithMenuProps {
  onEdit: () => void;
  onLogout: () => void;
}

export function ProfileImageWithMenu({
  onEdit,
  onLogout,
}: ProfileImageWithMenuProps) {
  const { user } = useUserStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isMenuOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <img
        className="rounded-full border-2 border-gray-300 cursor-pointer w-14 h-14"
        src={
          user?.profilePicture ||
          "https://jacksonandmorris.co.uk/wp-content/uploads/2017/04/default-user.png"
        }
        alt="avatar"
        referrerPolicy="no-referrer"
        onClick={handleMenuToggle}
      />

      <MenuOptions
        isMenuOpen={isMenuOpen}
        onEdit={onEdit}
        onLogout={onLogout}
      />
    </div>
  );
}
