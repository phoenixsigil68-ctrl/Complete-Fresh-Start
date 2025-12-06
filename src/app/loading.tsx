"use client";

import React from "react";
import Lottie from "lottie-react";
import Loader from "@/lib/loading.json";

const loading = () => {
  return (
    <div className="w-full h-dvh flex justify-center max-sm:start max-lg:justify-start max-md:justify-start items-center">
      <Lottie animationData={Loader} className="h-[200px]" loop={true}></Lottie>
    </div>
  );
};

export default loading;
