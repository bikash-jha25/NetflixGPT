import { createSlice } from "@reduxjs/toolkit";

const myListSlice = createSlice({
  name: "myList",
  initialState: {
    movies: [],
  },
  reducers: {
    addToMyList: (state, action) => {
      const movie = action.payload;

      const exists = state.movies.find((m) => m.id === movie.id);
      if (!exists) {
        state.movies.push(movie);
      }
    },

    removeFromMyList: (state, action) => {
      state.movies = state.movies.filter((m) => m.id !== action.payload.id);
    },
  },
});

export const { addToMyList, removeFromMyList } = myListSlice.actions;
export default myListSlice.reducer;
