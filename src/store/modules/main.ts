import { createSlice } from "@reduxjs/toolkit";

const mainSlice = createSlice({
  name: "main",
  initialState: {
    headerConfig: {
      isFixed: false,
      topAlpha: false,
    },
    searchInfos: {
      city: "",
    },
  },
  reducers: {
    changeHeaderConfigAction(state, { payload }) {
      state.headerConfig = payload;
    },
    changeSearchInfosAction(state, { payload }) {
      state.searchInfos = payload;
    },
  },
});

export const { changeHeaderConfigAction, changeSearchInfosAction } =
  mainSlice.actions;
export default mainSlice.reducer;
