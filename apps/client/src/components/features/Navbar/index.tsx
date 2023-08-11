import { User } from "@interfaces/user";
import { useUserStore } from "@stores/user";
import ProfileImage from "./components/ProfileImage";
import SignOutButton from "./components/SignoutButton";

interface NavbarProps {
  user: User | null;
}

export function Navbar({ user }: NavbarProps) {
  const { logoutUser } = useUserStore();

  const handleSignOut = () => {
    logoutUser();
    location.reload();
  };

  return (
    <nav className="flex justify-between py-8 px-5 items-center bg-blue-500 md:pl-28 lg:pl-64">
      <div className="flex gap-6">
        <ProfileImage />

        <div>
          <h3 className="text-gray-200">Welcome</h3>
          <h2 className="text-lg font-semibold text-white">{user?.name}</h2>
        </div>
      </div>

      <SignOutButton onClick={handleSignOut} />
    </nav>
  );
}
