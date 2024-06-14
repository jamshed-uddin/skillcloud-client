import React from "react";

const OverviewSkeleton = () => {
  return (
    <div className="lg:flex justify-between items-center gap-4 mb-6 space-y-4">
      {[1, 2, 3].map((item, index) => (
        <div
          className="rounded-xl skeleton shadow-md h-40 w-full bg-gray-200"
          key={index}
        ></div>
      ))}
    </div>
  );
};

export default OverviewSkeleton;
