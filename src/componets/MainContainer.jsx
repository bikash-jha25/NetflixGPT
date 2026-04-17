import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (movies === null) return;
  // Random movie instead of fixed index
  const randomIndex = Math.floor(Math.random() * movies.length);
  const mainMovie = movies[randomIndex];
  //const mainMovie = movies[11];
  //console.log(mainMovie);

  const { original_title, overview, id } = mainMovie;
  return (
    <div className="relative md:h-screen h-[50vh] overflow-hidden">
      <VideoBackground movieId={id} />
      <VideoTitle title={original_title} overview={overview} movieId={id} />
    </div>
  );
};

export default MainContainer;

// What it does: Picks one movie from the now-playing list to be the big hero feature. It renders two children stacked on top of each other:
// VideoBackground — the full-screen YouTube trailer playing behind everything
// VideoTitle — the overlay with the title, description, and buttons
