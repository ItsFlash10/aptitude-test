import { redirect } from "next/navigation";

import Landing from "@/screens/Landing";
import { getUserDetails } from "@/lib/utils";

const Home = async () => {
  const session = await getUserDetails();

  if (!session || !session?.user) {
    redirect("/login");
  }

  return (
    <>
      <Landing />
    </>
  );
};

export default Home;
