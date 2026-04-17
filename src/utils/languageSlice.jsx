import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  // name of the mini store
  name: "language",
  initialState: {
    lang: "en",
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const { changeLanguage } = languageSlice.actions;

export default languageSlice.reducer;
