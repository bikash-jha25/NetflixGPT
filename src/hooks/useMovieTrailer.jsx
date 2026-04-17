import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const useMovieTrailer = (movieId) => {
  //memoization
  const TrailerVideo = useSelector((state) => state.movies.trailerVideo);

  const dispatch = useDispatch();
  //This API returns array of videos associated with the movie ID
  const getMovieVideo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + movieId + "/videos",
      API_OPTIONS,
    );
    const json = await data.json();
    //i am getting array of videos of a movie with the id=movieId.
   // console.log(json);
    //but i am only concern about the trailer
    const filterData = json.results.filter((video) => video.type === "Trailer");
    const tariler = filterData.length ? filterData[0] : json.results[0];
    //this trailer object conatins key that redirect me with youtube
   // console.log(tariler);
    //i am uploading my trailer object on store
    dispatch(addTrailerVideo(tariler));
  };

  useEffect(() => {
    if (!movieId) return;
    {
      !TrailerVideo && getMovieVideo();
    }
  }, [movieId]);
};

export default useMovieTrailer;
