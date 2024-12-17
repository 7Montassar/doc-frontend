import { clsx, type ClassValue } from "clsx"
import { get } from "http"
import { twMerge } from "tailwind-merge"
import { getSession } from "./auth"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
