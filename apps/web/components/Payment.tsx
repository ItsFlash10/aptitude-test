"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";

const Payment = () => {
  const session = useSession();

  const amount = "1000";

  const createOrderId = async () => {
    try {
      const response = await fetch("/api/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(amount) * 100,
        }),
      });

      console.log({ response });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data.orderId;
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  };

  const processPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const orderId: string = await createOrderId();
      console.log({
        orderId,
        keyID: process.env.NEXT_PUBLIC_RAZORPAY_ID,
        gS: process.env.GOOGLE_CLIENT_SECRET || "",
      });

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
        amount: parseFloat(amount) * 100,
        currency: "INR",
        name: session.data?.user?.name,
        description: "description",
        order_id: orderId,
        handler: async function (response: any) {
          const data = {
            orderCreationId: orderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          const result = await fetch("/api/order/verify", {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
          });
          const res = await result.json();
          if (res.isOk) alert("payment succeed");
          else {
            alert(res.message);
          }
        },
        prefill: {
          name: session.data?.user?.name,
          email: session.data?.user?.email,
        },
        theme: {
          color: "#3399cc",
        },
      };
      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.on("payment.failed", function (response: any) {
        alert(response.error.description);
      });
      paymentObject.open();
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Button
      type="button"
      title="Payment"
      variant="link"
      onClick={(e: any) => processPayment(e)}
      className="h-10 w-10"
    >
      Hey
    </Button>
  );
};

export default Payment;
