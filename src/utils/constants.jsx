export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + import.meta.env.VITE_TMDB_TOKEN,
  },
};

export const MOVIES_URL_CDN = "https://image.tmdb.org/t/p/w500";
