import React, { memo, useEffect } from "react";
import { HomeWrapper } from "./style";
import HomeBanner from "./c-cpns/home-banner";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  changeRecommendInfo2Action,
  changeRecommendInfoAction,
  fetchHomeDataAction,
} from "../../store/modules/home";
import HomeSection from "./c-cpns/home-section";
import HomeSectionTabs from "./c-cpns/home-section-tabs";
import HomeLongfor from "./c-cpns/home-longfor";
import HomeSectionPlus from "./c-cpns/home-section-plus";
import { changeHeaderConfigAction } from "../../store/modules/main";
import { getHistoryData } from "services";
import { getOrder } from "services/modules/order";

// 为 Redux state 添加类型
interface HomeState {
  goodPriceInfo: any;
  highScoreInfo: any;
  discountInfo: any;
  recommendInfo: any;
  longforInfo: any;
  plusInfo: any;
  userInfo: any;
  recommendInfo2: any;
}

const Home = memo(() => {
  // 使用 useSelector 从 Redux store 获取数据
  const {
    goodPriceInfo,
    highScoreInfo,
    discountInfo,
    recommendInfo,
    longforInfo,
    plusInfo,
    userInfo,
    recommendInfo2,
  } = useSelector(
    (state: { home: HomeState }) => ({
      goodPriceInfo: state.home.goodPriceInfo,
      highScoreInfo: state.home.highScoreInfo,
      discountInfo: state.home.discountInfo,
      recommendInfo: state.home.recommendInfo,
      longforInfo: state.home.longforInfo,
      plusInfo: state.home.plusInfo,
      userInfo: state.home.userInfo,
      recommendInfo2: state.home.recommendInfo2,
    }),
    shallowEqual
  );

  // 派发异步事件：发送网络请求
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHomeDataAction() as any);
    dispatch(changeHeaderConfigAction({ isFixed: true, topAlpha: true }));
  }, [dispatch]);

  useEffect(() => {
    let userId: number;
    let role: string;
    const localuserInfo = JSON.parse(localStorage.getItem("user") as string);
    if (localuserInfo == null) return;
    if (!localuserInfo.id) return;
    if (userInfo.id) {
      userId = userInfo.id;
      role = userInfo.role;
    } else {
      userId = localuserInfo.id;
      role = localuserInfo.role;
    }
    if (userId && role === "guest") {
      getOrder(userId).then((res) => {
        if (res.data && res.data.length > 0) {
          getHistoryData(userId).then((res) => {
            dispatch(changeRecommendInfo2Action(res.data));
          });
        }
      });
    }
  }, []);

  return (
    <HomeWrapper>
      <HomeBanner />
      <div className="content">
        {longforInfo && Object.keys(longforInfo).length > 0 && (
          <HomeLongfor infoData={longforInfo} />
        )}
        {recommendInfo2 && Object.keys(recommendInfo2).length > 0 && (
          <HomeSection infoData={recommendInfo2} />
        )}
        {discountInfo && Object.keys(discountInfo).length > 0 && (
          <HomeSectionTabs infoData={discountInfo} />
        )}
        {recommendInfo && Object.keys(recommendInfo).length > 0 && (
          <HomeSectionTabs infoData={recommendInfo} />
        )}
        {goodPriceInfo && Object.keys(goodPriceInfo).length > 0 && (
          <HomeSection infoData={goodPriceInfo} />
        )}
        {highScoreInfo && Object.keys(highScoreInfo).length > 0 && (
          <HomeSection infoData={highScoreInfo} />
        )}
        {plusInfo && Object.keys(plusInfo).length > 0 && (
          <HomeSectionPlus infoData={plusInfo} />
        )}
      </div>
    </HomeWrapper>
  );
});

export default Home;
