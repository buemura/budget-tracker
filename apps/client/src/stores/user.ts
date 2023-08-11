import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { User } from "@interfaces/user";

type State = {
  user: User | null;
  setUser: (user: User) => void;
  logoutUser: () => void;
};

export const useUserStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user: User) => {
          set((state) => ({ user: user }));
        },
        logoutUser: () => {
          set(() => ({ user: null }));
        },
      }),
      {
        name: "user-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
