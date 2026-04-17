import { useSelector } from "react-redux";
import MoviesList from "./MoviesList";

const MyList = () => {
  const movies = useSelector((store) => store.myList.movies);

  if (!movies.length) {
    return <div className="text-white p-6 md:p-10 pt-24 min-h-screen bg-black ">No movies in your list</div>;
  }

  return (
    <div className="bg-black min-h-screen pt-16 md:pt-24">
      <MoviesList title="My List" movies={movies} />
    </div>
  );
};

export default MyList;
