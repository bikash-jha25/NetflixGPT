import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_OPTIONS, MOVIES_URL_CDN } from "../utils/constants";
import MoviesList from "./MoviesList";
import ShimmerMovieDetails from "./ShimmerMovieDetails";
import star from "../assets/star.png";
import flame from "../assets/flame.png";
import clock from "../assets/clock.png";
import calendar from "../assets/calendar.png";
import geminicon from "../assets/geminicon.svg";
import { useDispatch, useSelector } from "react-redux";
import { addToMyList, removeFromMyList } from "../utils/myListSlice";
import ai from "../utils/gemini";
import ShimmerSummary from "./ShimmerSummary";

const MovieDetails = () => {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewSummary, setReviewSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);

  //Fetch Movie
  const fetchMovieDetails = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      API_OPTIONS,
    );
    const json = await data.json();
    setMovie(json);
  };
  //Fetch Trailer
  const fetchTrailer = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      API_OPTIONS,
    );
    const json = await data.json();

    const trailer = json.results.find((video) => video.type === "Trailer");

    setTrailer(trailer);
  };
  //Fetch Cast
  const fetchCast = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits`,
      API_OPTIONS,
    );
    const json = await data.json();
    setCast(json.cast.slice(0, 10));
  };
  //Fetch Recommendations
  const fetchRecommendations = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations`,
      API_OPTIONS,
    );
    const json = await data.json();
    setRecommendations(json.results);
  };
  //Fetch Reviews
  const fetchReviews = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
      API_OPTIONS,
    );
    const json = await data.json();
    setReviews(json.results);
  };

  //when movieId changes or component mounts then i want to fetch all new data of that movie and reset all old data of previous movie.
  useEffect(() => {
    //reset so that dont so info of previous movie.
    setMovie(null);
    setTrailer(null);
    setCast([]);
    setRecommendations([]);
    setReviews([]);
    setReviewSummary("");
    //fetch all details.
    fetchMovieDetails();
    fetchTrailer();
    fetchCast();
    fetchRecommendations();
    fetchReviews();

    window.scrollTo(0, 0);
  }, [movieId]);

  //My List Logic
  const dispatch = useDispatch();
  //My List is a array of object that contains id,title,poster path.
  const myList = useSelector((store) => store.myList.movies);
  const isInList = movie && myList.some((m) => m.id === movie.id);
  const handleMyList = () => {
    if (!movie) return;
    const movieData = {
      //i alredy have this movie object in my [movie,setmovie] State variable that i fetch earlier.
      id: movie.id, //i am just making special object of it conating few details and will store in my store.
      title: movie.title,
      poster_path: movie.poster_path,
    };
    if (isInList) {
      dispatch(removeFromMyList(movieData));
    } else {
      dispatch(addToMyList(movieData));
    }
  };

  //AI Review Summary Logic
  const handleSummarizeReviews = async () => {
    if (!reviews.length) return;

    setLoadingSummary(true);

    const text = reviews
      .slice(0, 5)
      .map((r) => r.content)
      .join(" ");

    const prompt = `Summarize these movie reviews in 2-3 lines.Also mention overall sentiment (positive/negative/mixed):${text}`;

    try {
      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      setReviewSummary(result.text);
    } catch (err) {
      console.error(err);
    }

    setLoadingSummary(false);
  };

  if (movie == null) return <ShimmerMovieDetails />;
  return (
    <div className="relative min-h-screen text-white">
      {/*BACKGROUND IMAGE */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      />

      {/*DARK OVERLAY */}
      <div className="fixed inset-0 bg-black/70 -z-10" />

      {/*CONTENT CONTAINER */}
      <div className="max-w-6xl mx-auto md:py-10 md:px-4 py-6 px-3">
        {/*GLASS CONTAINER WRAPPER*/}
        <div
          className="
          backdrop-blur-lg bg-black/10 
          border border-black/20 
          rounded-3xl 
          p-4 md:p-10
          shadow-2xl
        "
        >
          {/*TRAILER */}
          {trailer && (
            <div className="md:mb-10 mb-6 rounded-2xl overflow-hidden">
              <iframe
                className="w-full md:h-96 h-48 scale-100"
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {/*MOVIE DETAILS DIV*/}
          <div className="md:p-6 md:mb-6 md:space-y-4 p-3 mb-4 space-y-3">
            {/* Title */}
            <h1 className="md:text-4xl text-2xl font-bold">{movie.title}</h1>
            {/* My List button */}
            <button
              onClick={handleMyList}
              className="mt-2 flex items-center gap-2 md:px-4 md:py-2  md:text-base px-3 py-1.5 text-sm rounded-lg bg-white/10 hover:bg-white/20 transition cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={isInList ? "green" : "none"}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="md:w-6 md:h-6 w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              <span>
                {isInList ? (
                  <span className="text-green-700 font-bold">Added</span>
                ) : (
                  "Add to My List"
                )}
              </span>
            </button>
            {/* Stats row */}
            {/*Rating |  Popularity |  Runtime |  Year */}
            <div className="flex flex-wrap items-center md:gap-6 md:text-md gap-3 text-sm font-bold text-gray-200">
              {/* ⭐ Rating */}
              <div className="flex items-center md:gap-2 gap-1.5">
                <img
                  src={star}
                  alt="rating"
                  className="md:w-6 md:h-6 w-4 h-4"
                />
                <span>{movie.vote_average?.toFixed(1) || "N/A"} / 10</span>
              </div>

              {/* 🔥 Popularity */}
              <div className="flex items-center gap-2">
                <img src={flame} alt="popularity" className="w-6 h-6" />
                <span>{Math.round(movie.popularity) || "N/A"}</span>
              </div>

              {/* ⏱️ Runtime */}
              <div className="flex items-center md:gap-2 gap-1.5">
                <img
                  src={clock}
                  alt="runtime"
                  className="md:w-6 md:h-6 w-4 h-4"
                />
                <span>
                  {movie.runtime
                    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
                    : "N/A"}
                </span>
              </div>

              {/* 📅 Year */}
              <div className="flex items-center md:gap-2 gap-1.5">
                <img
                  src={calendar}
                  alt="year"
                  className="md:w-6 md:h-6 w-4 h-4"
                />
                <span>{movie.release_date?.split("-")[0] || "N/A"}</span>
              </div>
            </div>

            {/*Genres */}
            <div className="flex flex-wrap gap-2">
              {movie.genres?.map((g) => (
                <span
                  key={g.id}
                  className="md:px-3 md:py-1 md:text-md px-2 py-0.5 text-xs bg-white/20 rounded-full text-md backdrop-blur-sm"
                >
                  {g.name}
                </span>
              ))}
            </div>

            {/* 📄 Overview */}
            <p className="md:text-base text-sm text-gray-300 leading-relaxed">
              {movie.overview}
            </p>
          </div>

          {/*CAST DETAILS */}
          <div className="md:p-6 md:mb-10 p-3 mb-6">
            <h2 className="md:text-2xl md:mb-4 text-xl mb-3 font-semibold">
              Top Cast
            </h2>

            <div className="flex md:gap-4 gap-3 overflow-x-auto no-scrollbar transition-all duration-300">
              {cast
                .filter((actor) => actor.profile_path) //to remove actors with out poster
                .map((actor) => (
                  <div
                    key={actor.id}
                    className="md:w-28 w-20 shrink-0 hover:scale-105 transition"
                  >
                    <img
                      className="rounded-lg w-full"
                      src={
                        actor.profile_path
                          ? MOVIES_URL_CDN + actor.profile_path
                          : "https://via.placeholder.com/150"
                      }
                      alt={actor.name}
                    />
                    <p className="md:text-sm md:mt-2 text-xs mt-1">
                      {actor.name}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* 📝 REVIEWS SECTION */}
          <div className="md:p-6 md:mb-10 p-3 mb-6">
            <h2 className="md:text-2xl md:mb-4 text-xl mb-3 font-semibold">
              Reviews
            </h2>
            {/* 🤖 AI BUTTON */}
            {reviews.length > 0 && (
              <button
                onClick={handleSummarizeReviews}
                disabled={loadingSummary}
                className={`mb-4 flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${
                  loadingSummary
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600 cursor-pointer transition-all"
                }`}
              >
                <img
                  src={geminicon}
                  alt="AI"
                  className="w-5 h-5 drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
                />
                {loadingSummary ? "Thinking..." : "Summarize Reviews"}
              </button>
            )}
            {/* 🤖 AI SUMMARY */}
            {/* i will able to see this div only if i have AI review */}
            {/* if loadingSummary is true then SHow shimmer. */}
            {loadingSummary && <ShimmerSummary />}
            {/* //else show the summary */}
            {!loadingSummary && reviewSummary && (
              <div className="bg-white/10 border border-white/20 p-4 rounded-xl mb-6 animate-fadeIn">
                <h3 className="flex items-center gap-2 text-lg font-semibold mb-2">
                  <img src={geminicon} alt="AI" className="w-5 h-5" />
                  AI Summary
                </h3>
                <p className="text-gray-300">{reviewSummary}</p>
              </div>
            )}
            {/* 📄 REVIEWS LIST */}
            {reviews.length > 0 ? (
              <div className="space-y-4 max-h-100 overflow-y-auto no-scrollbar">
                {reviews.slice(0, 5).map((review, index) => (
                  <div
                    key={index}
                    className="bg-black/10 p-4 rounded-xl border border-black/20"
                  >
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                      <span>{review.author}</span>
                    </div>

                    {review.author_details?.rating && (
                      <div className="flex items-center gap-1 text-yellow-400 text-sm mb-2">
                        <img src={star} className="w-4 h-4" />
                        <span>{review.author_details.rating}/10</span>
                      </div>
                    )}

                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">
                      {review.content}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No reviews available</p>
            )}
          </div>
          {/*RECOMMENDATIONS */}
          {recommendations.length > 0 && (
            <div className="md:p-6 p-3">
              <MoviesList title="Recommended Movies" movies={recommendations} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
