import { createSlice } from "@reduxjs/toolkit";

const detailSlice = createSlice({
  name: "detail",
  initialState: {
    detailInfo: {},
    confirmInfo: {},
    order: {},
  },
  reducers: {
    changeDetailInfoAction(state, { payload }) {
      state.detailInfo = payload;
    },
    changeConfirmInfoAction(state, { payload }) {
      state.confirmInfo = payload;
    },
    changeOrderInfoAction(state, { payload }) {
      state.order = payload;
    },
  },
});

export const {
  changeDetailInfoAction,
  changeConfirmInfoAction,
  changeOrderInfoAction,
} = detailSlice.actions;
export default detailSlice.reducer;
