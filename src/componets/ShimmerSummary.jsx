import React from "react";

const ShimmerSummary = () => {
  return (
    <div className="bg-white/10 border border-white/20 p-4 rounded-xl mb-6 animate-pulse">
      {/* Title shimmer */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 bg-gray-500 rounded-full"></div>
        <div className="h-4 w-32 bg-gray-500 rounded"></div>
      </div>

      {/* Lines shimmer */}
      <div className="space-y-3">
        <div className="h-3 bg-gray-500 rounded w-full"></div>
        <div className="h-3 bg-gray-500 rounded w-[90%]"></div>
        <div className="h-3 bg-gray-500 rounded w-[80%]"></div>
      </div>
    </div>
  );
};

export default ShimmerSummary;
