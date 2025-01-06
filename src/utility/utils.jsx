// Lib Imports.
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Helper function to compile classNames.
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
