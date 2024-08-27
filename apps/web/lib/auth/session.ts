import { getServerSession } from "next-auth";

import { authOptions } from "./options";

export const getSession = async () => await getServerSession(authOptions);
