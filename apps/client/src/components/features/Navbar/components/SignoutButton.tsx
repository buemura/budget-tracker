import { FiLogOut } from 'react-icons/fi';

interface SignOutButtonProps {
  onClick: () => void;
}

export default function SignOutButton({ onClick }: SignOutButtonProps) {
  return (
    <button
      className="bg-blue-600 text-base text-white p-2 rounded-full md:mr-28 lg:mr-64"
      onClick={onClick}
    >
      <FiLogOut />
    </button>
  );
}
