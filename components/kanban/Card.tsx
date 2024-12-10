"use client";

import clsx from "clsx";
import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { OrderType } from "@/app/types/client/item";
import { Card } from "../ui/card";
import { HomeIcon, ScaleIcon, ShoppingBagIcon } from "lucide-react";

interface PropsInterface {
  item: OrderType;
  index: number;
  handleCardClick: (item: OrderType) => void;
}

export default function LaundryCard(props: PropsInterface) {
  const { item, index, handleCardClick } = props;

  return (
    <Draggable draggableId={item.orderID} index={index}>
      {(provided, snapshot) => (
        <Card
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={clsx(
            snapshot.isDragging ? "bg-slate-50" : "bg-white",
            "mb-5 h-fit min-h-[190px] w-full select-none rounded-xl p-[10px]"
          )}
          onClick={() => handleCardClick(item)}
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
              <p className="text-[14px] text-slate-600">{item.weight} kg</p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-[6px]">
            {item.services.toSorted().map((service) => (
              <div
                className="flex h-5 w-12 items-center justify-center rounded-2xl bg-[#173563] text-[10px] font-bold text-white"
                key={`${service}-${item.orderID}`}
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
