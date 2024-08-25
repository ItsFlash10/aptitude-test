"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

import styles from "./Landing.module.css";
import { processPayment } from "@/lib/payment";

interface ILandingProps {
  isSubscribed: boolean;
}

const Landing = (props: ILandingProps) => {
  const { isSubscribed } = props;

  const router = useRouter();
  const session = useSession();
  const user = session.data?.user;

  const handlePaymentSuccess = () => router.push("/instructions");

  const handleClick = () => {
    isSubscribed
      ? router.push("/instructions")
      : processPayment({ amount: 1000, session, successCallback: handlePaymentSuccess });
  };

  return (
    <div
      className={cn(
        `flex h-screen w-screen flex-col items-center justify-center bg-[#070e22] ${styles.bgImage}`,
      )}
    >
      {/* TODO: This is temporary */}
      {!!user?.email ? (
        <>
          <div className="mb-4 text-xl text-white">{`Hi! ${user?.name}`}</div>
          <Button onClick={handleClick}>Unleash your potential</Button>
        </>
      ) : (
        <div className="text-base">Please login to continue</div>
      )}
      <Footer />
    </div>
  );
};

export default Landing;
