import React from "react";
import MoviesCard from "./MoviesCard";

const MoviesList = ({ title, movies }) => {
  if (movies === null) return;
  //console.log(movies);
  return (
    <div className="px-3 md:px-6 py-4">
      <h1 className="md:text-3xl text-xl md:py-4 py-3 text-white font-semibold">{title}</h1>
      <div className="flex overflow-x-auto no-scrollbar scroll-smooth cursor-pointer">
        <div className="flex md:gap-4 gap-2 pb-2">
          {movies.map((movie) => (
            <MoviesCard
              key={movie?.id}
              poster={movie?.poster_path}
              title={movie?.title}
              movieId={movie?.id}
            />
          ))}
        </div>
      </div>
      {/* <MoviesCard poster={movies[0].poster_path} title={movies[0].title} /> */}
    </div>
  );
};

export default MoviesList;

// MoviesList receives a title string and a movies array.
// It renders a horizontal scroll row of MoviesCard components.
// Used in SecondaryContainer, GptMovieSuggestion, and MovieDetails (recommendations).

// Takes a title string and movies array as props. 
// Renders a horizontal scrollable row of MoviesCard components. 
// overflow-x-auto + no-scrollbar gives you a scrollable row with the scrollbar hidden