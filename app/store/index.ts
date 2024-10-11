import { create } from "zustand";

type Store = {
  shopID: string | null;
  setShopID: (storeID: string) => void;
};

const useShopID = create<Store>((set) => ({
  shopID: null,
  setShopID: (storeID) => set(() => ({ shopID: storeID })),
}));

export default useShopID;
