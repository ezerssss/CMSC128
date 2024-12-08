import { BoardStatusEnum } from "@/app/enums/board";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateTrackingNumber() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length: 12 }, function () {
    return characters.charAt(Math.floor(Math.random() * characters.length));
  }).join("");
}

export const censorName = (name: string) => {
  const parts = name.split(" ");
  return parts
    .map((part) =>
      part.length <= 2
        ? part
        : part[0] + "*".repeat(part.length - 2) + part[part.length - 1]
    )
    .join(" ");
};

export function formatDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

export function formatTime(date: Date) {
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  return `${String(hours).padStart(2, "0")}:${minutes}:${seconds} ${ampm}`;
}

export function getBoardStatusTitle(status: BoardStatusEnum): string {
  switch (status) {
    case BoardStatusEnum.DONE:
      return "Done";
    case BoardStatusEnum.IDLE:
      return "Idle";
    case BoardStatusEnum.IN_PROGRESS:
      return "In Progress";
    case BoardStatusEnum.TO_BE_DELIVERED:
      return "To be Delivered";
    case BoardStatusEnum.TO_BE_PICKED_UP:
      return "To be Picked up";
    case BoardStatusEnum.WAITING_FOR_CUSTOMER:
      return "Waiting for customer pick up";
  }
}

export function getInputDateLocaleDefaultValue(date: Date) {
  const localDate =
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0");

  return localDate;
}

export function getStartOfWeek(date: Date): Date {
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day;
  startOfWeek.setDate(diff);
  startOfWeek.setHours(0, 0, 0, 0);
  return startOfWeek;
}

export function getEndOfWeek(startOfWeek: Date): Date {
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday
  endOfWeek.setHours(23, 59, 59, 999);
  return endOfWeek;
}
