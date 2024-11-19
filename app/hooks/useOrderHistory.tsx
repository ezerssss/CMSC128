import { useEffect, useState } from "react";
import { OrderType } from "../types/client/item";
import { collection, onSnapshot } from "firebase/firestore";
import clientDb from "../firebase/clientDB";
import useShopID from "../store";

function useOrderHistory() {
  const { shopID } = useShopID();

  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    if (!shopID) {
      return;
    }

    const orderDocRef = collection(clientDb, "shops", shopID, "orders");

    const unsub = onSnapshot(orderDocRef, (snapshot) => {
      const updatedOrders: OrderType[] = [];

      snapshot.docs.forEach((doc) => {
        const data = doc.data() as OrderType;
        updatedOrders.push(data);
      });

      setOrders(updatedOrders);
    });

    return () => unsub();
  }, [shopID]);

  return { orders };
}

export default useOrderHistory;
