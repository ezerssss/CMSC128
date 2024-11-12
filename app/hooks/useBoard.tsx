import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import clientDb from "../firebase/clientDB";
import useShopID from "../store";
import { OrderType } from "../types/client/item";
import { DropResult } from "@hello-pangea/dnd";
import { UpdateOrderRequestType } from "../types/server/item";
import { BoardStatusEnum } from "../enums/board";

interface BoardDataInterface {
  [key: string]: OrderType[];
}

function useBoard() {
  const { shopID } = useShopID();

  const [boardItems, setBoardItems] = useState<BoardDataInterface>({
    "to-be-picked-up": [],
    idle: [],
    "in-progress": [],
    "to-be-delivered": [],
    "waiting-for-customer": [],
    done: [],
  });

  // Real-time update handler
  useEffect(() => {
    if (!shopID) {
      return;
    }

    const ordersCollectionRef = collection(clientDb, "shops", shopID, "orders");

    // Generate the orders state
    const unsub = onSnapshot(ordersCollectionRef, (snapshot) => {
      let updatedBoardState: BoardDataInterface = {
        "to-be-picked-up": [],
        idle: [],
        "in-progress": [],
        "to-be-delivered": [],
        "waiting-for-customer": [],
        done: [],
      };

      snapshot.docs.forEach((doc) => {
        const data = doc.data() as OrderType;

        // The fuck sometimes it sees an empty document ROFL
        // Band-aid as of now
        if (data.boardStatus) {
          updatedBoardState[data.boardStatus].push(data);
        }
      });

      setBoardItems(updatedBoardState);
    });

    return () => unsub();
  }, [shopID]);

  async function handleDragEnd(result: DropResult<string>) {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const column = boardItems[source.droppableId];
      const updatedColumnItems = [...column];

      const [item] = updatedColumnItems.splice(source.index, 1);

      updatedColumnItems.splice(destination.index, 0, item);

      setBoardItems({
        ...boardItems,
        [source.droppableId]: updatedColumnItems,
      });
    } else {
      const sourceColumn = boardItems[source.droppableId];
      const destinationColumn = boardItems[destination.droppableId];

      const sourceItems = [...sourceColumn];
      const destinationItems = [...destinationColumn];

      const [removed] = sourceItems.splice(source.index, 1);

      destinationItems.splice(destination.index, 0, removed);
      const { orderID, shopID } = destinationItems[destination.index];

      setBoardItems({
        ...boardItems,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destinationItems,
      });

      const updateOrderRequest: UpdateOrderRequestType = {
        orderID,
        shopID,
        newBoardStatus: destination.droppableId as BoardStatusEnum,
      };

      await fetch("/api/order/update", {
        method: "POST",
        body: JSON.stringify(updateOrderRequest),
      });
    }
  }

  return { boardItems, handleDragEnd };
}

export default useBoard;
