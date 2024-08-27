import { AppBar } from "@/components/AppBar";

import db from "@repo/db/client";
import Landing from "@/components/Landing";
import { getSession } from "@/lib/auth/session";

const Home = async () => {
  const session = await getSession();
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
