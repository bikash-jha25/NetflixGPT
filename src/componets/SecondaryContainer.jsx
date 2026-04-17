import React from "react";
import MoviesList from "./MoviesList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div className="bg-black text-white">
      <div className="-mt-12 md:-mt-52 md:pl-12 relative z-20">
        <MoviesList title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MoviesList title={"Popular"} movies={movies.popularMovies} />
        <MoviesList title={"Top Rated"} movies={movies.topRatedMovies} />
        <MoviesList title={"Upcoming"} movies={movies.upcomingMovies} />
       
      </div>
    </div>
  );
};

export default SecondaryContainer;

//  Reads all 4 movie arrays from Redux and renders a MoviesList for each. 
//  The -mt-52 is the Netflix trick — it pulls this section up to overlap the bottom of the hero video, 
//  creating that characteristic layered look.