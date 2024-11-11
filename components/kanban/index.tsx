"use client";

import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { OrderType } from "@/app/types/client/item";
import { tempLaundryCardData } from "@/data/laundryCards";
import Column from "./Column";
import NewOrder from "./NewOrder";
import useShopID from "@/app/store";
import { collection, onSnapshot } from "firebase/firestore";
import clientDb from "@/app/firebase/clientDB";

interface BoardDataInterface {
  [key: string]: OrderType[];
}

function handleDragEnd(
  result: DropResult<string>,
  items: BoardDataInterface,
  setItems: React.Dispatch<React.SetStateAction<BoardDataInterface>>
) {
  if (!result.destination) {
    return;
  }

  const { source, destination } = result;

  if (source.droppableId === destination.droppableId) {
    const column = items[source.droppableId];
    const updatedColumnItems = [...column];

    const [item] = updatedColumnItems.splice(source.index, 1);

    updatedColumnItems.splice(destination.index, 0, item);

    setItems({
      ...items,
      [source.droppableId]: updatedColumnItems,
    });
  } else {
    const sourceColumn = items[source.droppableId];
    const destinationColumn = items[destination.droppableId];

    const sourceItems = [...sourceColumn];
    const destinationItems = [...destinationColumn];

    const [removed] = sourceItems.splice(source.index, 1);

    destinationItems.splice(destination.index, 0, removed);

    setItems({
      ...items,
      [source.droppableId]: sourceItems,
      [destination.droppableId]: destinationItems,
    });
  }
}

export default function Board() {
  const { shopID } = useShopID();

  const [orders, setOrders] = useState<BoardDataInterface>({
    "to-be-picked-up": [],
    idle: [],
    "in-progress": [],
    "to-be-delivered": [],
    "waiting-for-customer": [],
    done: [],
  });

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

      setOrders(updatedBoardState);
    });

    return () => unsub();
  }, [shopID]);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <DragDropContext
          onDragEnd={(result) => handleDragEnd(result, orders, setOrders)}
        >
          <Column
            title="To be Picked Up"
            id="to-be-picked-up"
            items={orders["to-be-picked-up"]}
          />
          <Column title="Idle" id="idle" items={orders["idle"]} />
          <Column
            title="In Progress"
            id="in-progress"
            items={orders["in-progress"]}
          />
          <Column
            title="To be Delivered"
            id="to-be-delivered"
            items={orders["to-be-delivered"]}
          />
          <Column
            title="Waiting for Customer"
            id="waiting-for-customer"
            items={orders["waiting-for-customer"]}
          />
          <Column title="Done" id="done" items={orders["done"]} />
        </DragDropContext>
      </div>

      <NewOrder />
    </>
  );
}
