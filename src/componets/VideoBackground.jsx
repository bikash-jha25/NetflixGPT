import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  //fetching the trailer video key from the API using the custom hook and saving it to the store.
  useMovieTrailer(movieId);
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  if (!trailerVideo?.key) return null;

  return (
    <div className="w-full h-full ">
      <iframe
        className="w-full h-full md:scale-150 "
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?autoplay=1&mute=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;

//  Calls the trailer hook which puts the trailer object in Redux.
//  Then reads trailerVideo.key (a YouTube video ID like "dQw4w9WgXcQ") and 
//  embeds it as a muted autoplaying iframe scaled to fill the screen (scale-150 makes it slightly oversized to hide letterboxing).