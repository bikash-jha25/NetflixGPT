import React from "react";
import { MOVIES_URL_CDN } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const MoviesCard = ({ poster, title, movieId }) => {
  const navigate = useNavigate();
  //i dont want to see any movie on my UI which does not have a poster
  if (poster == null) return null;

  return (
    <div
      className="md:w-48 w-32 transition-transform duration-300 hover:scale-105"
      onClick={() => navigate("/movie/" + movieId)}
    >
      <img
        className="rounded-md object-cover "
        src={MOVIES_URL_CDN + poster}
        alt={title}
      />
    </div>
  );
};

export default MoviesCard;
// MoviesCard shows a movie poster image.
// Clicking navigates to /movie/:movieId (MovieDetails page).
// Cards with no poster_path return null to avoid broken images in the row.

// Takes poster, title, movieId as props. Renders a single poster image. 
// If poster is null it returns nothing (avoids broken images). 
// Clicking navigates to /movie/:movieId.
