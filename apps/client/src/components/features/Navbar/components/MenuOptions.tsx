import EditButton from "./EditButton";
import { SignOutButton } from "./SignoutButton";

interface MenuOptionsProps {
  isMenuOpen: boolean;
  onEdit: () => void;
  onLogout: () => void;
}

export function MenuOptions({
  isMenuOpen,
  onEdit,
  onLogout,
}: MenuOptionsProps) {
  if (!isMenuOpen) {
    return null;
  }

  return (
    <div className="absolute bg-neutral-100 border rounded shadow mt-2">
      <EditButton onClick={onEdit} />
      <SignOutButton onClick={onLogout} />
    </div>
  );
}
