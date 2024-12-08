import { useEffect, useState } from "react";
import { OrderType } from "../types/client/item";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import clientDb from "../firebase/clientDB";
import useShopID from "../store";

function useUnpaidOrders() {
  const { shopID } = useShopID();

  const [unpaidOrders, setUnpaidOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    if (!shopID) {
      return;
    }

    const orderCollectionRef = collection(clientDb, "shops", shopID, "orders");
    const unpaidOrderQuery = query(
      orderCollectionRef,
      where("paymentStatus", "==", "Unpaid")
    );

    const unsub = onSnapshot(unpaidOrderQuery, (snapshot) => {
      const updatedOrders: OrderType[] = [];

      snapshot.docs.forEach((doc) => {
        const data = doc.data() as OrderType;
        updatedOrders.push(data);
      });

      setUnpaidOrders(updatedOrders);
    });

    return () => unsub();
  }, [shopID]);

  return { unpaidOrders };
}

export default useUnpaidOrders;
