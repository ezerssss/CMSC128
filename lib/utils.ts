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
