import { useEffect, useState } from "react";

import { User } from "../interfaces/user";
import { authService } from "../services/http/auth-service";
import { useRouterNavigate } from "./useRouterNavigate";

export const useCheckAuth = (user: User | null) => {
  const { routerNavigate } = useRouterNavigate();
  const [hasError, setHasError] = useState(false);

  const fetchUserData = async () => {
    try {
      await authService.getUserData({
        accessToken: user?.accessToken || "",
      });
    } catch (error) {
      setHasError(true);
    }
  };

  useEffect(() => {
    if (!user) {
      return routerNavigate("/auth/login");
    }

    fetchUserData();
  }, [user]);

  return { hasError };
};
