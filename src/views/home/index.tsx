import React, { memo, useEffect } from "react";
import { HomeWrapper } from "./style";
import HomeBanner from "./c-cpns/home-banner";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchHomeDataAction } from "../../store/modules/home";
import HomeSection from "./c-cpns/home-section";
import HomeSectionTabs from "./c-cpns/home-section-tabs";
import HomeLongfor from "./c-cpns/home-longfor";
import HomeSectionPlus from "./c-cpns/home-section-plus";
import { changeHeaderConfigAction } from "../../store/modules/main";

// 为 Redux state 添加类型
interface HomeState {
  goodPriceInfo: any;
  highScoreInfo: any;
  discountInfo: any;
  recommendInfo: any;
  longforInfo: any;
  plusInfo: any;
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
  } = useSelector(
    (state: { home: HomeState }) => ({
      goodPriceInfo: state.home.goodPriceInfo,
      highScoreInfo: state.home.highScoreInfo,
      discountInfo: state.home.discountInfo,
      recommendInfo: state.home.recommendInfo,
      longforInfo: state.home.longforInfo,
      plusInfo: state.home.plusInfo,
    }),
    shallowEqual
  );

  // 派发异步事件：发送网络请求
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHomeDataAction() as any);
    dispatch(changeHeaderConfigAction({ isFixed: true, topAlpha: true }));
  }, [dispatch]);

  return (
    <HomeWrapper>
      <HomeBanner />
      <div className="content">
        {longforInfo && Object.keys(longforInfo).length > 0 && (
          <HomeLongfor infoData={longforInfo} />
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