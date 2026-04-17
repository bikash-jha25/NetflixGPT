import React from "react";
import { useSelector } from "react-redux";
import MoviesList from "./MoviesList";

const GptMovieSuggetion = () => {
  const movieNames = useSelector((store) => store.gpt.movieNames);
  const movieResults = useSelector((store) => store.gpt.movieResults);
  // console.log(movieNames);
  // console.log(movieResults);
  if (!movieNames || !movieResults) return null;
  return (
    <div className="md:mt-10 mt-6 md:w-[85%] w-full mx-auto  rounded-xl shadow-lg border border-white/20">
      {movieNames.map((movie, index) => (
        <MoviesList
          key={movieNames[index] + index} //has to be unique
          title={movieNames[index]}
          movies={movieResults[index]}
        />
      ))}
    </div>
  );
};

export default GptMovieSuggetion;

{
  /* // <MoviesList title={movieNames[0]} movies={movieResults[0]} /> */
}
