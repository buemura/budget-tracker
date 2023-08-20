import { Accounts } from "../../components/features/Accounts";
import { Expenses } from "../../components/features/Expenses";
import { Navbar } from "../../components/features/Navbar";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { useUserStore } from "../../stores/user";

export function Home() {
  const { user, logoutUser } = useUserStore();
  const { hasError } = useCheckAuth(user);

  if (hasError) {
    logoutUser();
  }

  return (
    <div className="min-w-screen min-h-screen bg-gray-100">
      <Navbar user={user} />

      <div className="flex flex-col p-2">
        <Expenses />
        <Accounts />
        {/* <Investments /> */}
        {/* <Transactions /> */}
      </div>
    </div>
  );
}
