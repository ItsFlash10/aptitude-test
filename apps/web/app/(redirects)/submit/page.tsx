import React from "react";
import { cn } from "@/lib/utils";

import styles from "./page.module.css";

const page = () => {
  return (
    <div
      className={cn(
        `flex h-screen w-screen flex-col items-center justify-center bg-[#070e22] ${styles.bgImage}`,
      )}
    >
      <h1 className="bg-gradient-to-r from-[#3b4075] to-[#8f8ead] bg-clip-text text-2xl text-transparent">
        THANK YOU!!
      </h1>
    </div>
  );
};

export default page;
