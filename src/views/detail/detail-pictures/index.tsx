import React, { memo, useState } from "react";
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
  const { detailInfo } = useSelector(
    (state: { detail: { detailInfo: IDetailInfo } }) => ({
      detailInfo: state.detail.detailInfo,
    })
  );

  return (
    <PicturesWrapper>
      <div className="pictures">
        <div className="left">
          <div className="item" onClick={() => setShowBrowser(true)}>
            <img src={detailInfo?.picture_urls?.[0]} alt="" />
            <div className="cover"></div>
          </div>
        </div>
        <div className="right">
          {detailInfo?.picture_urls?.slice(1, 5).map((item, index) => {
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
      <div className="show-btn" onClick={() => setShowBrowser(true)}>
        显示图片
      </div>
      {showBrowser && (
        <PictureBrowser
          pictureUrls={detailInfo.picture_urls}
          closeclick={() => setShowBrowser(false)}
        ></PictureBrowser>
      )}
    </PicturesWrapper>
  );
});

export default DetailPictures;