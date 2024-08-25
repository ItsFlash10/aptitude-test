import React from "react";
import { Metadata } from "next";

import { redirect } from "next/navigation";

import { getUserDetails } from "@/lib/utils";
import SignIn from "@/components/SignIn";

export const metadata: Metadata = {
  title: "Login",
};

const AuthPage = async () => {
  const session = await getUserDetails();

  if (session) {
    redirect("/");
  }

  return <SignIn />;
};

export default AuthPage;
