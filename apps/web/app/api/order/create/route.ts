import { NextResponse } from "next/server";

import { razorpayInstance } from "@/lib/payment";

export async function GET() {
  const payment_capture = 1;
  const amount = 1 * 1000; // amount in paisa. In our case it's INR 1
  const currency = "INR";
  const options = {
    amount: amount.toString(),
    currency,
    receipt: new Date().toISOString(),
    payment_capture,
    notes: {
      // These notes will be added to your transaction. So you can search it within their dashboard.
      // Also, it's included in webhooks as well. So you can automate it.
      paymentFor: "testingDemo",
      userId: "100",
      productId: "P100",
    },
  };
  try {
    const order = await razorpayInstance.orders.create(options);
    return NextResponse.json({ msg: "success", order });
  } catch (err) {
    console.log({ err });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ msg: body });
}
