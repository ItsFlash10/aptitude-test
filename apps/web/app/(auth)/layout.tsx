import { redirect } from "next/navigation";

import { getUserDetails } from "@/lib/utils";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getUserDetails();

  if (session) redirect("/");

  return <>{children}</>;
}
