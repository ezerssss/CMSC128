"use client";

import clsx from "clsx";
import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { LaundryCardInterface } from "@/app/types/client/item";
import { tempLaundryCardData } from "@/data/laundryCards";
import { Card } from "./ui/card";
import { HomeIcon, ScaleIcon, ShoppingBagIcon } from "lucide-react";

interface ColumnPropsInterface {
  title: string;
  id: string;
  items: LaundryCardInterface[];
  max?: number;
}

function LaundryCard({
  item,
  index,
}: {
  item: LaundryCardInterface;
  index: number;
}) {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={clsx(
            snapshot.isDragging ? "bg-slate-50" : "bg-white",
            "mb-5 h-fit min-h-[190px] w-full select-none rounded-xl p-[10px]"
          )}
        >
          <p className="text-large mb-[6px] font-semibold">{item.name}</p>

          <div className="space-y-1">
            <div className="flex items-start gap-2">
              <HomeIcon
                size={15}
                strokeWidth={3}
                className="mt-1 flex-shrink-0"
              />
              <p className="max-h-[40px] overflow-hidden text-ellipsis text-[14px] text-slate-600">
                {item.address ?? "-"}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <ShoppingBagIcon
                size={15}
                strokeWidth={3}
                className="mt-1 flex-shrink-0"
              />
              <p className="text-[14px] text-slate-600">{item.bag}</p>
            </div>
            <div className="flex items-start gap-2">
              <ScaleIcon
                size={15}
                strokeWidth={3}
                className="mt-1 flex-shrink-0"
              />
              <p className="text-[14px] text-slate-600">{item.kilos} kg</p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-[6px]">
            {item.services.sort().map((service) => (
              <div
                className="flex h-5 w-12 items-center justify-center rounded-2xl bg-[#173563] text-[10px] font-bold text-white"
                key={`${service}-${item.id}`}
              >
                {service}
              </div>
            ))}
          </div>
        </Card>
      )}
    </Draggable>
  );
}

function Column(props: ColumnPropsInterface) {
  const { title, items, id, max } = props;

  return (
    <div className="h-full flex-1 space-y-8 text-black">
      <header className="rounded-xl bg-[#D8EAF9] p-6">  {/* */}
        <p className="text-large font-semibold">{title}</p>
        <p className="text-small text-gray-500">
          {items.length} items {max && `/ ${max} (Max: ${max})`}
        </p>
      </header>

      <Droppable droppableId={id}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="h-[470px] overflow-auto rounded-xl bg-[#c8d3dc50] p-3" // bg of tasks
          >
            {items.map((item, index) => (
              <LaundryCard item={item} index={index} key={item.id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

interface BoardDataInterface {
  [key: string]: LaundryCardInterface[];
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
  const [items, setItems] = useState<BoardDataInterface>({
    "to-be-picked-up": tempLaundryCardData,
    idle: [],
    washing: [],
    "to-be-delivered": [],
    "waiting-for-customer": [],
    done: [],
  });

  return (
    <div className="flex flex-wrap gap-2">
      <DragDropContext
        onDragEnd={(result) => handleDragEnd(result, items, setItems)}
      >
        <Column
          title="To be Picked Up"
          id="to-be-picked-up"
          items={items["to-be-picked-up"]}
        />
        <Column title="Idle" id="idle" items={items["idle"]} />
        <Column title="Washing" id="washing" items={items["washing"]} />
        <Column
          title="To be Delivered"
          id="to-be-delivered"
          items={items["to-be-delivered"]}
        />
        <Column
          title="Waiting for Customer"
          id="waiting-for-customer"
          items={items["waiting-for-customer"]}
        />
        <Column title="Done" id="done" items={items["done"]} />
      </DragDropContext>
    </div>
  );
}
