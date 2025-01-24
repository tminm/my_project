import { createSlice } from "@reduxjs/toolkit";

const detailSlice = createSlice({
  name: "detail",
  initialState: {
    detailInfo: {},
    confirmInfo: {},
  },
  reducers: {
    changeDetailInfoAction(state, { payload }) {
      state.detailInfo = payload;
    },
    changeConfirmInfoAction(state, { payload }) {
      state.confirmInfo = payload;
    },
  },
});

export const { changeDetailInfoAction, changeConfirmInfoAction } =
  detailSlice.actions;
export default detailSlice.reducer;
