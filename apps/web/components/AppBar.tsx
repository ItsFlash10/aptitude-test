"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useScroll } from "@/hooks/useScroll";

export const AppBar = () => {
  const router = useRouter();
  const session = useSession();
  const scrolled = useScroll(80);

  const user = session.data?.user;

  const handleLogin = () => {
    user ? signOut() : router.push("/login");
  };

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="fixed inset-x-0 top-0 w-full"
    >
      {scrolled && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 1 }}
          className="absolute inset-0 -z-[1] h-full w-full bg-black/20 backdrop-blur-md"
        />
      )}
      {/* MaxWidthWrapper */}
      <div className="relative mx-auto w-full max-w-screen-xl px-2.5 lg:px-10">
        <div className="flex items-center justify-between py-6">
          <Link href={"/"} className="cursor-pointer">
            <span className="hidden text-lg font-bold tracking-tight text-foreground md:block md:text-xl">
              100xQuests
            </span>
          </Link>
          <div className="cursor-pointer" onClick={handleLogin}>
            {user ? "Logout" : "Login"}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
