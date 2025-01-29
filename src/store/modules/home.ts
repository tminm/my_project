import { use } from "react";
import {
  getHomeDiscountData,
  getHomeGoodPriceData,
  getHomeHightScoreData,
  getHomeHotRecommendData,
  getHomeLongforData,
  getHomePlusData,
} from "../../services";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// 使用 async/await 来处理异步请求
export const fetchHomeDataAction = createAsyncThunk(
  "home/fetchHomeData", // action name
  async (_, { dispatch, getState }) => {
    // 获取所有数据
    const goodPriceData = await getHomeGoodPriceData();
    dispatch(changeGoodPriceInfoAction(goodPriceData));

    const highScoreData = await getHomeHightScoreData();
    dispatch(changeHighScoreInfoAction(highScoreData));

    const discountData = await getHomeDiscountData();
    dispatch(changeDiscountInfoAction(discountData));

    const recommendData = await getHomeHotRecommendData();
    dispatch(changeRecommendInfoAction(recommendData));

    const longforData = await getHomeLongforData();
    dispatch(changeLongForInfoAction(longforData));

    const plusData = await getHomePlusData();
    dispatch(changePlusInfoAction(plusData));

    // const state = getState();
    // const { username, password } = (
    //   state as { home: { userInfo: { username: string; password: string } } }
    // ).home.userInfo;
    // const userInfo = await getLoginInfo(username, password);
    // dispatch(changeUserInfoAction(userInfo));
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState: {
    goodPriceInfo: {},
    highScoreInfo: {},
    discountInfo: {},
    recommendInfo: {},
    longforInfo: {},
    plusInfo: {},
    userInfo: {},
    roomInfo: {},
  },
  reducers: {
    changeGoodPriceInfoAction(state, { payload }) {
      state.goodPriceInfo = payload;
    },
    changeHighScoreInfoAction(state, { payload }) {
      state.highScoreInfo = payload;
    },
    changeDiscountInfoAction(state, { payload }) {
      state.discountInfo = payload;
    },
    changeRecommendInfoAction(state, { payload }) {
      state.recommendInfo = payload;
    },
    changeLongForInfoAction(state, { payload }) {
      state.longforInfo = payload;
    },
    changePlusInfoAction(state, { payload }) {
      state.plusInfo = payload;
    },
    changeUserInfoAction(state, { payload }) {
      state.userInfo = payload;
    },
    changeRoomInfoAction(state, { payload }) {
      state.roomInfo = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHomeDataAction.fulfilled, (state) => {
      // 这里不需要做额外的处理，因为所有数据已经通过 dispatch 处理
      // 你可以选择在这里记录日志或者更新其他状态
    });
  },
});

export const {
  changeGoodPriceInfoAction,
  changeHighScoreInfoAction,
  changeDiscountInfoAction,
  changeRecommendInfoAction,
  changeLongForInfoAction,
  changePlusInfoAction,
  changeUserInfoAction,
  changeRoomInfoAction,
} = homeSlice.actions;

export default homeSlice.reducer;
