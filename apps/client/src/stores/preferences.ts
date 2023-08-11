import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

type State = {
  balanceVisible: boolean;
  changeBalanceVisible: () => void;
};

export const usePreferenceStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        balanceVisible: true,
        changeBalanceVisible: () => {
          set((state) => ({
            balanceVisible: !state.balanceVisible,
          }));
        },
      }),
      {
        name: "preferences-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
