import { FiPlusCircle } from "react-icons/fi";

interface PlusButtonProps {
  onClick: () => void;
}

export function PlusButton({ onClick }: PlusButtonProps) {
  return (
    <FiPlusCircle
      className="my-4 text-2xl cursor-pointer text-primary hover:text-secondary"
      onClick={onClick}
    />
  );
}
