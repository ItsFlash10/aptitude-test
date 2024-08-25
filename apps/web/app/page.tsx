import { redirect } from "next/navigation";

import Landing from "@/screens/Landing";
import { getUserDetails } from "@/lib/utils";
import { AppBar } from "@/components/AppBar";

import db from "@repo/db/client";

const Home = async () => {
  const session = await getUserDetails();
  const user = await db.user.findFirst({
    where: { email: session?.user?.email },
  });

  return (
    <>
      <AppBar />
      <Landing isSubscribed={!!user?.subscribed} />
    </>
  );
};

export default Home;
