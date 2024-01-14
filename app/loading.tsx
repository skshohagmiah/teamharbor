import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="h-full w-full flex flex-col gap-4 items-center justify-center px-6">
      <Skeleton className="w-[200px] md:w-full  h-[50px] rounded-sm" />
      <Skeleton className="w-[200px] md:w-full h-[50px] rounded-sm" />
      <Skeleton className="w-[200px] md:w-full h-[50px] rounded-sm" />
      <Skeleton className="w-[200px] md:w-full h-[50px] rounded-sm" />
      <Skeleton className="w-[200px] md:w-full h-[50px] rounded-sm" />
    </div>
  );
};

export default loading;
