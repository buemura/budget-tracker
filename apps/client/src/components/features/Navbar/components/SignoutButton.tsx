import { FiLogOut } from "react-icons/fi";

interface SignOutButtonProps {
  onClick: () => void;
}

export function SignOutButton({ onClick }: SignOutButtonProps) {
  return (
    <button
      className="w-full flex items-center gap-4 whitespace-nowrap cursor-pointer px-4 py-2 hover:bg-gray-200"
      onClick={onClick}
    >
      <FiLogOut />
      Log Out
    </button>
  );
}
