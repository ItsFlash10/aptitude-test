import { type ClassValue, clsx } from "clsx";
import { getServerSession } from "next-auth";
import { twMerge } from "tailwind-merge";

import { authOptions } from "./auth";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUserDetails = async () => await getServerSession(authOptions);

// TODO: Add check for coming from in test page
export const createQueryString = (name: string, value: string) => {
  const params = new URLSearchParams();
  params.set(name, value);

  return params.toString();
};
