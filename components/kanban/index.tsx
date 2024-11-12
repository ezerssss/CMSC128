"use client";

import React from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";
import NewOrder from "./NewOrder";
import useBoard from "@/app/hooks/useBoard";

export default function Board() {
  const { boardItems, handleDragEnd } = useBoard();

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
          <Column
            title="To be Picked Up"
            id="to-be-picked-up"
            items={boardItems["to-be-picked-up"]}
          />
          <Column title="Idle" id="idle" items={boardItems["idle"]} />
          <Column
            title="In Progress"
            id="in-progress"
            items={boardItems["in-progress"]}
          />
          <Column
            title="To be Delivered"
            id="to-be-delivered"
            items={boardItems["to-be-delivered"]}
          />
          <Column
            title="Waiting for Customer"
            id="waiting-for-customer"
            items={boardItems["waiting-for-customer"]}
          />
          <Column title="Done" id="done" items={boardItems["done"]} />
        </DragDropContext>
      </div>

      <NewOrder />
    </>
  );
}
