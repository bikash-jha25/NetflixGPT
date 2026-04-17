import React from "react";

const ShimmerMovieDetails = () => {
  return (
    <div className="relative min-h-screen text-white animate-pulse">
      {/* 🔴 Background */}
      <div className="fixed inset-0 bg-gray-900 -z-10" />

      {/* Overlay */}
      <div className="fixed inset-0 bg-black/70 -z-10" />

      {/* 🟢 Glass Container */}
      <div className="max-w-6xl mx-auto py-10 px-4">
        <div className="backdrop-blur-xl bg-black/10 border border-black/20 rounded-3xl p-6 md:p-10 shadow-2xl space-y-10">
          {/* 🎥 Trailer */}
          <div className="w-full h-60 md:h-96 bg-gray-800 rounded-2xl" />

          {/* 🎬 Movie Info */}
          <div className="space-y-4">
            <div className="h-10 w-1/2 bg-gray-700 rounded" />
            <div className="h-4 w-3/4 bg-gray-700 rounded" />
            <div className="h-4 w-2/3 bg-gray-700 rounded" />
          </div>

          {/* 👥 Cast */}
          <div>
            <div className="h-6 w-40 bg-gray-700 rounded mb-4" />

            <div className="flex gap-4 overflow-x-hidden">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="w-28 shrink-0">
                    <div className="w-28 h-36 bg-gray-800 rounded-lg" />
                    <div className="h-3 bg-gray-700 rounded mt-2" />
                  </div>
                ))}
            </div>
          </div>

          {/* 🎯 Recommendations */}
          <div>
            <div className="h-6 w-52 bg-gray-700 rounded mb-4" />

            <div className="flex gap-4 overflow-x-hidden">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="w-40 h-60 bg-gray-800 rounded-md" />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerMovieDetails;
