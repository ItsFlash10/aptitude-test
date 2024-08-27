import React from "react";
import { Metadata } from "next";

import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/session";
import SignIn from "@/components/SignIn";

export const metadata: Metadata = {
  title: "Login",
};

const AuthPage = async () => {
  const session = await getSession();

  if (session) {
    redirect("/");
  }

  return <SignIn />;
};

export default AuthPage;
