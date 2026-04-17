import React, { useState, useEffect, useRef } from "react";
import { FaSearchengin } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import lang from "../utils/languageConstants";
import ai from "../utils/gemini";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const words = [
  "Action",
  "Adventure",
  "Comedy",
  "Crime",
  "Drama",
  "Fantasy",
  "Horror",
  "Romance",
  "Sci-Fi",
];

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const searchRef = useRef(null);
  const [loading, setLoading] = useState(false);
  //Search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS,
    );
    const json = await data.json();

    return json.results;
  };

  //this is async function
  const handleGptSearchClick = async () => {
    setLoading(true);
    //console.log(searchRef.current.value);//to get whatever inside my input box
    //Make an API Call to gemini API and get movie results.
    const prompt =
      "Act as a Movie Recommendation systemn and suggest some movies for the prompt : " +
      searchRef.current.value +
      ". only give me names of 5 movies, comma seperated tike the example result given ahead. Example Result: The Crow, Blade Runner 2049, Watchmen, Dredd, Sin City";

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    //This will give movies String containing five movies
    // "Se7en, V for Vendetta, Joker, Taxi Driver, Leon: The Professional"
    //console.log(result.text);

    const moviesArray = result.text.split(",");
    //This will give movies Array containing five movies
    //['Se7en', ' V for Vendetta', ' Collateral', ' Oldboy', ' Leon: The Professional']
    // console.log(moviesArray);

    //For each movie i will call the tmdb API
    const promiseArray = moviesArray.map((movie) => searchMovieTMDB(movie));
    //This will return me a promise Array
    //[Promise,Promise,Promise,Promise,Promise,]

    //I shall resolve This this promise Array For that i need to wait for non fixed amount of time
    const tmdbResults = await Promise.all(promiseArray);
    //This will return me 5 array containing actual information of movie
    // [Array(20), Array(2), Array(3), Array(0), Array(20)]
    //console.log(tmdbResults);

    //I shall save and push all my data to store so that i can use it wherever
    //I am pushing both Gemini result and Real TMDB movie data to store in form of object
    //dispatch(action({object1,object2}))
    dispatch(
      addGptMovieResult({
        movieNames: moviesArray,
        movieResults: tmdbResults,
      }),
    );
    setLoading(false);
  };

  const KeyLang = useSelector((store) => store.language.lang);

  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setAnimate(false);
      }, 300);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="md:pt-[10%] pt-[20%] flex justify-center px-4">
      {/*Added gap-4*/}
      <form
        className="md:w-1/2 md:gap-3 w-full gap-2 grid grid-cols-12 "
        onSubmit={(e) => e.preventDefault()}
      >
        {/*INPUT */}
        <div className="md:col-span-10 col-span-10 relative overflow-hidden rounded-xl">
          {/* Beam */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
            <div
              className="absolute top-0 -left-full w-[200%] h-full 
              bg-linear-to-r from-transparent via-red-400 to-transparent 
              opacity-30 animate-[beam_3s_linear_infinite]"
            ></div>
          </div>

          {/* Input box */}
          <div className="relative md:px-4 md:py-3 px-3 py-2 border border-red-500 rounded-xl bg-transparent">
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent outline-none text-white md:text-base text-sm"
            />

            {/* Placeholder */}
            {!query && (
              <div className="absolute md:left-4 md:gap-2 md:text-base left-3 gap-1 text-sm top-1/2 -translate-y-1/2 flex items-center text-red-400 italic pointer-events-none overflow-hidden h-6">
                <span className="whitespace-nowrap">
                  {/* this line is important */}
                  {lang[KeyLang].placeholder}
                </span>
                <span
                  className={`font-bold inline-block transition-all duration-300 ${
                    animate
                      ? "-translate-y-6 opacity-0"
                      : "translate-y-0 opacity-100"
                  }`}
                >
                  {words[index]}
                </span>
              </div>
            )}
          </div>
        </div>

        {/*BUTTON */}
        <button
          disabled={loading}
          className="md:col-span-2 md:text-sm col-span-2 text-xs flex justify-center items-center 
  bg-red-700 text-white rounded-xl font-semibold 
  disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleGptSearchClick}
        >
          {/* <FaSearchengin className="text-2xl" /> */}
          {/* this line is important */}
          {lang[KeyLang].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
