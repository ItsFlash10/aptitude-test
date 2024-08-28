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
    isSubscribed
      ? router.push("/instructions")
      : processPayment({ amount: 1000, session, successCallback: handlePaymentSuccess });
    // router.push("/dashboard");
  };

  const renderCards = () =>
    [{}, {}].map((_, index) => (
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
    ));

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
        <h1 className="bg-gradient-to-r from-[#3b4075] to-[#54537a] bg-clip-text text-2xl text-transparent">
          LOGIN TO UNLEASH YOUR POTENTIAL
        </h1>
      )}

      <Footer />
    </div>
  );
};

export default Landing;
