import httpInstance from "../request";

export function getHomeGoodPriceData() {
  return httpInstance.get({
    url: "/home/goodprice",
  });
}

export function getHomeHightScoreData() {
  return httpInstance.get({
    url: "/home/highscore",
  });
}

export function getHomeDiscountData() {
  return httpInstance.get({
    url: "/home/discount",
  });
}

export function getHomeHotRecommendData() {
  return httpInstance.get({
    url: "/home/hotRecommenddest",
  });
}

export function getHomeLongforData() {
  return httpInstance.get({
    url: "/home/longfor",
  });
}

export function getHomePlusData() {
  return httpInstance.get({
    url: "/home/plus",
  });
}
