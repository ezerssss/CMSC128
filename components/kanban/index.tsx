"use client";

import React, { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";
import NewOrder from "./NewOrder";
import useBoard from "@/app/hooks/useBoard";
import EditOrder from "./EditOrder";
import { OrderType } from "@/app/types/client/item";

export default function Board() {
  const { boardItems, handleDragEnd } = useBoard();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<OrderType>();

  function handleCardClick(item: OrderType) {
    setIsEditOpen(true);
    setCurrentOrder(item);
  }

  function handleOnOpenChange(open: boolean) {
    setIsEditOpen(open);
    if (!open) {
      setCurrentOrder(undefined);
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
          <Column
            title="To be Picked Up"
            id="to-be-picked-up"
            items={boardItems["to-be-picked-up"]}
            handleCardClick={handleCardClick}
          />
          <Column
            title="Idle"
            id="idle"
            items={boardItems["idle"]}
            handleCardClick={handleCardClick}
          />
          <Column
            title="In Progress"
            id="in-progress"
            items={boardItems["in-progress"]}
            handleCardClick={handleCardClick}
          />
          <Column
            title="To be Delivered"
            id="to-be-delivered"
            items={boardItems["to-be-delivered"]}
            handleCardClick={handleCardClick}
          />
          <Column
            title="Waiting for Customer"
            id="waiting-for-customer"
            items={boardItems["waiting-for-customer"]}
            handleCardClick={handleCardClick}
          />
          <Column
            title="Done"
            id="done"
            items={boardItems["done"]}
            handleCardClick={handleCardClick}
          />
        </DragDropContext>
      </div>

      <NewOrder />
      {currentOrder && (
        <EditOrder
          order={currentOrder}
          isOpen={isEditOpen}
          handleOnOpenChange={handleOnOpenChange}
        />
      )}
    </>
  );
}
