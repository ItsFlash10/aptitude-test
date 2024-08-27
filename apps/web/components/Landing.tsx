"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, useAnimation } from "framer-motion";

import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { processPayment } from "@/lib/payment";
import { cn } from "@/lib/utils";

import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

import styles from "./Landing.module.css";
import Testimonials from "./home/Testimonials";

interface ILandingProps {
  isSubscribed: boolean;
}

const Landing = (props: ILandingProps) => {
  const { isSubscribed } = props;

  const router = useRouter();
  const session = useSession();
  const user = session.data?.user;

  const controls = useAnimation();

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }));
  }, [controls]);

  const handlePaymentSuccess = () => router.push("/instructions");

  const handleClick = () => {
    // isSubscribed
    //   ? router.push("/instructions")
    //   : processPayment({ amount: 1000, session, successCallback: handlePaymentSuccess });
    router.push("/dashboard");
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
      {/* <main>
        <div
          className="senja-embed"
          data-id="4ac65b64-922c-4daf-af40-5cf71ade893f"
          data-lazyload="false"
          data-mode="shadow"
        ></div>
        <Script
          async
          type="text/javascript"
          src="https://static.senja.io/dist/platform.js"
        ></Script>
      </main> */}
      <div className="mt-8 flex gap-4">
        {[{}, {}].map((_, index) => (
          <motion.div
            key={index}
            custom={index}
            initial={{ opacity: 0, y: 0 }}
            animate={controls}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
          >
            <Card>
              <CardHeader>This is the header</CardHeader>
              <CardContent>Test Info</CardContent>
              <CardFooter>This is the footer</CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
