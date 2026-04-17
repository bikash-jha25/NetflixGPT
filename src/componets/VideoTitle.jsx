import React from "react";
import { useNavigate } from "react-router-dom";

const VideoTitle = ({ title, overview, movieId }) => {
  const navigate = useNavigate();
  const handlePlay = () => {
    navigate(`/movie/${movieId}`);
  };

  const handleMoreInfo = () => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div
      className="absolute top-0 left-0 w-full h-full z-10 
    bg-linear-to-r from-black via-black/70 to-transparent 
    text-white flex flex-col md:justify-center justify-end md:px-12 px-6 md:pb-0 pb-8
    animate-fadeIn"
    >
      {/* Title */}
      <h1 className="md:text-5xl text-xl font-bold md:w-1/2 w-full md:mb-4 md:py-2 mb-3 line-clamp-2">
        {title}
      </h1>

      {/* Overview */}
      <p className="hidden md:block w-1/2 text-lg mb-6 text-gray-300 hover:text-white">
        {overview}
      </p>
      {/* Buttons */}
      <div className="flex md:gap-4 gap-3">
        <button
          onClick={handlePlay}
          className="flex items-center gap-2 
        bg-white text-black md:px-8 px-4 py-2 rounded-md font-semibold
        md:hover:scale-110 hover:scale-105  hover:bg-opacity-80 
        transition-all duration-300 shadow-lg hover:shadow-white/30 cursor-pointer text-sm md:text-base"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="md:w-5 md:h-5 w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
              clipRule="evenodd"
            />
          </svg>
          <span>Play</span>
        </button>
        <button
          onClick={handleMoreInfo}
          className="flex items-center gap-2 
        bg-gray-500 bg-opacity-70 md:px-6 px-4 py-2 rounded-md font-semibold
        md:hover:scale-110 hover:scale-105 hover:bg-opacity-90 
        transition-all duration-300 shadow-lg hover:shadow-gray-400/30 cursor-pointer text-sm md:text-base"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="md:w-5 md:h-5 w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clipRule="evenodd"
            />
          </svg>
          <span>More Info</span>
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
// Overlays on top of VideoBackground using absolute positioning. 
// The gradient (from-black via-black/70 to-transparent) fades from left to right so the text is readable against the video. 
// Both Play and More Info navigate to /movie/:movieId.
