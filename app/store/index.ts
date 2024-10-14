import { create } from "zustand";

type Store = {
  shopID: string | null;
  setShopID: (shopID: string) => void;
};

const useShopID = create<Store>((set) => ({
  shopID: null,
  setShopID: (shopID) => set(() => ({ shopID })),
}));

export default useShopID;
