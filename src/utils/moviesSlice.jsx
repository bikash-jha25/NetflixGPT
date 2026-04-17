import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies", //keep the name as string
  initialState: {
    upcomingMovies: null,
    topRatedMovies: null,
    popularMovies: null,
    nowPlayingMovies: null,
    trailerVideo: null,
  },
  reducers: {
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
  },
});

export const {
  addUpcomingMovies,
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  addTopRatedMovies,
} = moviesSlice.actions;
export default moviesSlice.reducer;
