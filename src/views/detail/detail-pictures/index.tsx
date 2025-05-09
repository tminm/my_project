import React, { memo, useEffect, useState } from "react";
import { PicturesWrapper } from "./style";
import { useSelector } from "react-redux";
import PictureBrowser from "../../../base-ui/picture-browser";

// 假设 detailInfo 的类型如下
interface IDetailInfo {
  picture_urls: string[]; // 图片 URL 数组
}

const DetailPictures = memo(() => {
  // 定义内部状态
  const [showBrowser, setShowBrowser] = useState(false);
  // 使用 useSelector 获取 detailInfo，并为它指定类型
  let { detailInfo, goodPriceInfo } = useSelector(
    (state: { detail: { detailInfo: any }; home: { goodPriceInfo: any } }) => ({
      detailInfo: state.detail.detailInfo,
      goodPriceInfo: state.home.goodPriceInfo,
    })
  );
  let pictureList: string[];
  if (!goodPriceInfo.data) {
    //从localStorage中获取pictureList
    pictureList = JSON.parse(localStorage.getItem("pictureList") || "[]");
  } else {
    pictureList = (goodPriceInfo.data[0].list as Array<any>).map(
      (item) => item.picture_url
    );
  }

  if (Object.keys(detailInfo).length === 0) {
    detailInfo = JSON.parse(localStorage.getItem("detailInfo") || "{}");
  }

  useEffect(() => {
    localStorage.setItem("pictureList", JSON.stringify(pictureList));
    localStorage.setItem("detailInfo", JSON.stringify(detailInfo));
  }, []);

  //将picture_urls数组的每一个元素位置随机打乱
  pictureList.sort(() => Math.random() - 0.5);

  return (
    <PicturesWrapper>
      <div className="pictures">
        <div className="left">
          <div className="item" onClick={() => setShowBrowser(true)}>
            {detailInfo?.picture_urls?.[0] ? (
              <img src={detailInfo?.picture_urls?.[0]} alt="" />
            ) : (
              <img src={detailInfo.picture_url} alt="" />
            )}
            <img src={detailInfo?.picture_urls?.[0]} alt="" />
            <div className="cover"></div>
          </div>
        </div>
        <div className="right">
          {detailInfo?.picture_urls
            ? detailInfo?.picture_urls
                ?.slice(1, 5)
                .map((item: string, index: number) => {
                  return (
                    <div
                      className="item"
                      key={index}
                      onClick={() => setShowBrowser(true)}
                    >
                      <img src={item} alt="" />
                      <div className="cover"></div>
                    </div>
                  );
                })
            : pictureList.slice(1, 5).map((item: string, index: number) => {
                return (
                  <div
                    className="item"
                    key={index}
                    onClick={() => setShowBrowser(true)}
                  >
                    <img src={item} alt="" />
                    <div className="cover"></div>
                  </div>
                );
              })}
        </div>
      </div>
      {/* <div className="show-btn" onClick={() => setShowBrowser(true)}>
        显示图片
      </div> */}
      {showBrowser && (
        <PictureBrowser
          pictureUrls={
            detailInfo.picture_urls ? detailInfo.picture_urls : pictureList
          }
          closeclick={() => setShowBrowser(false)}
        ></PictureBrowser>
      )}
    </PicturesWrapper>
  );
});

export default DetailPictures;
