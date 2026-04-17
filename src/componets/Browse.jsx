import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GptContainer from "./GptContainer";
import { useSelector } from "react-redux";

const Browse = () => {
  const showGptContainer = useSelector((store) => store.gpt.showGptContainer);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  return (
    <div className="overflow-x-hidden">
      <Header />
      {showGptContainer ? (
        <GptContainer />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;

//The Browse page
// Normal mode (showGptContainer = false): Shows the Netflix hero + movie rows
// AI mode (showGptContainer = true): Shows the Gemini search interface