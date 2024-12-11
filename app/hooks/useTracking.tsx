import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { OrderType } from "../types/client/item";
import { doc, onSnapshot } from "firebase/firestore";
import clientDb from "../firebase/clientDB";

function useTracking() {
  const searchParams = useSearchParams();
  const orderID = searchParams.get("orderID");
  const shopID = searchParams.get("shopID");

  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);
  const [order, setOrder] = useState<OrderType>();

  useEffect(() => {
    if (!orderID || !shopID) {
      setIsLoading(false);
      return;
    }

    const orderDocRef = doc(clientDb, "shops", shopID, "orders", orderID);

    const unsub = onSnapshot(orderDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const orderData = docSnapshot.data() as OrderType;
        setOrder(orderData);
        setIsEmpty(false);
      } else {
        setIsEmpty(true);
      }

      setIsLoading(false);
    });

    return () => unsub();
  }, [orderID, shopID]);

  return { order, isLoading, isEmpty };
}

export default useTracking;
