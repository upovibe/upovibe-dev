import React from "react";
import Lottie from "lottie-react";
import pageLoading from "@/public/animations/PageLoading.json";

const Loading = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <Lottie animationData={pageLoading} loop className="size-20" />
    </div>
  );
};

export default Loading;
