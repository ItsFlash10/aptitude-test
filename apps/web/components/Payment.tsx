"use client";

import React from "react";
import { useSession } from "next-auth/react";

import { processPayment } from "@/lib/payment";

import { Button } from "./ui/button";

const Payment = () => {
  const session = useSession();

  return (
    <Button
      type="button"
      title="Payment"
      variant="link"
      onClick={(e: any) => processPayment({ e, amount: 1000, session })}
      className="h-10 w-10"
    >
      Hey
    </Button>
  );
};

export default Payment;
