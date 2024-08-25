import { SessionContextValue } from "next-auth/react";
import { toast } from "sonner";

export const createOrderId = async (amount: number) => {
  try {
    const response = await fetch("/api/order/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.orderId;
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
  }
};

export const processPayment = async ({
  e,
  amount,
  session,
  successCallback,
}: {
  e?: React.FormEvent<HTMLFormElement>;
  amount: number;
  session: SessionContextValue;
  successCallback?: () => void;
}) => {
  const formattedAmount = amount * 100;
  e && e.preventDefault();
  try {
    const orderId: string = await createOrderId(formattedAmount);

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
      amount: formattedAmount,
      currency: "INR",
      image: session.data?.user?.image,
      name: session.data?.user?.name,
      description: "description",
      order_id: orderId,
      handler: async function (response: any) {
        const data = {
          orderCreationId: orderId,
          razorpayPaymentId: response.razorpay_payment_id, // only this is present in the response
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await fetch("/api/order/verify", {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        });
        const res = await result.json();

        if (res.isOk) {
          toast.success("Payment Successful! Thanks for joining.");
          successCallback && successCallback();
        } else {
          toast.error(`Payment Failed! ${res.message}`);
        }
      },
      prefill: {
        name: session.data?.user?.name,
        email: session.data?.user?.email,
      },
      theme: {
        color: "#070e22",
      },
      //   modal: {
      //     backdropclose: false, // Prevent closing on clicking the backdrop
      //     escape: false, // Prevent closing on pressing Esc
      //     ondismiss: function () {
      //       console.log("Checkout form dismissed");
      //     },
      //     backdropColor: "red", // Set backdrop color to transparent
      //     container: {
      //       background: "red", // Set container background to transparent
      //     },
      //   },
    };
    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.on("payment.failed", function (response: any) {
      toast.error(response.error.description);
    });
    paymentObject.open();
  } catch (error) {
    console.log({ error });
  }
};
