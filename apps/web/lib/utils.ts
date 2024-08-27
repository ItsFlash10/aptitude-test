import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// this should ideally be in packages/utils/functions/cn.ts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// TODO: Add check for coming from in test page
// this should ideally be in packages/utils/functions/string(or string-format).ts
export const createQueryString = (name: string, value: string) => {
  const params = new URLSearchParams();
  params.set(name, value);
  return params.toString();
};
