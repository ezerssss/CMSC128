"use client";

import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import { OrderType } from "@/app/types/client/item";
import LaundryCard from "./Card";

interface PropsInterface {
  title: string;
  id: string;
  items: OrderType[];
  handleCardClick: (item: OrderType) => void;
}

export default function Column(props: PropsInterface) {
  const { title, items, id, handleCardClick } = props;

  return (
    <div className="h-full flex-1 space-y-8 text-black">
      <header className="rounded-xl bg-[#D8EAF9] p-6">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-sm text-gray-500">{items.length} items</p>
      </header>

      <Droppable droppableId={id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="h-[470px] overflow-auto rounded-xl bg-[#D8EAF9] p-3"
          >
            {items.map((item, index) => (
              <LaundryCard
                item={item}
                index={index}
                key={item.orderID}
                handleCardClick={handleCardClick}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
