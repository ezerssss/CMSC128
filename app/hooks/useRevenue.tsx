import { useEffect, useState } from "react";
import { OrderType } from "../types/client/item";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import clientDb from "../firebase/clientDB";
import useShopID from "../store";

function useRevenue() {
  const { shopID } = useShopID();
  const [revenue, setRevenue] = useState(0);
  const [paidOrders, setPaidOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    if (!shopID) {
      return;
    }

    const orderCollectionRef = collection(clientDb, "shops", shopID, "orders");
    const unpaidOrderQuery = query(
      orderCollectionRef,
      where("paymentStatus", "==", "Paid")
    );

    const unsub = onSnapshot(unpaidOrderQuery, (snapshot) => {
      const updatedOrders: OrderType[] = [];
      let revenueLocal = 0;

      snapshot.docs.forEach((doc) => {
        const data = doc.data() as OrderType;
        updatedOrders.push(data);
        revenueLocal += data.price;
      });

      setRevenue(revenueLocal);
      setPaidOrders(updatedOrders);
    });

    return () => unsub();
  }, [shopID]);

  return { revenue, paidOrders };
}

export default useRevenue;
