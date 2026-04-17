import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptContainer: false,
    movieResults: null,
    movieNames: null,
  },
  reducers: {
    toggleGptContainerView: (state, action) => {
      state.showGptContainer = !state.showGptContainer;
    },
    addGptMovieResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
    },
  },
});
export const { toggleGptContainerView, addGptMovieResult } = gptSlice.actions;
export default gptSlice.reducer;
