import React, { memo, useRef } from "react";
import { Carousel, Rate } from "antd";
import IconArrowLeft from "../../assets/svg/icon-arrow-left";
import IconArrowRight from "../../assets/svg/icon-arrow-right";
import { ItemWrapper } from "./style";
import type { CarouselProps } from "antd"; // 引入 Carousel 的 props 类型

interface ItemData {
  picture_url?: string;
  picture_urls?: string[];
  verify_info?: {
    text_color?: string;
    messages: string[];
  };
  name: string;
  price: number;
  reviews_count?: number;
  bottom_info?: {
    content?: string;
  };
}

interface IProps {
  itemData: ItemData;
  itemwidth?: string;
  itemClick?: (itemData: ItemData) => void;
}

const RoomItem: React.FC<IProps> = memo(function RoomItem(props) {
  const { itemData, itemwidth = "25%", itemClick } = props;
  const sliderRef = useRef<any | null>(null); // 使用 Carousel 作为类型

  // 事件处理函数
  function controlClickHandle(isRight = true) {
    if (sliderRef.current) {
      isRight ? sliderRef.current.next() : sliderRef.current.prev();
    }
  }

  function itemClickHandle(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    if (itemClick) itemClick(itemData);
  }

  return (
    <ItemWrapper
      verifyColor={itemData?.verify_info?.text_color || "#39576a"}
      itemwidth={itemwidth}
      onClick={itemClickHandle}
    >
      <div className="inner">
        {!itemData.picture_urls ? (
          <div className="cover">
            <img src={itemData.picture_url} alt="" />
          </div>
        ) : (
          <div className="swiper">
            <div className="control">
              <div
                className="btn left"
                onClick={(e) => controlClickHandle(false)}
              >
                <IconArrowLeft height="30" width="30" />
              </div>
              <div
                className="btn right"
                onClick={(e) => controlClickHandle(true)}
              >
                <IconArrowRight height="30" width="30" />
              </div>
            </div>
            <Carousel dots={false} ref={sliderRef}>
              {itemData.picture_urls.map((item) => (
                <div className="cover" key={item}>
                  <img src={item} alt="" />
                </div>
              ))}
            </Carousel>
          </div>
        )}

        {/* <div className="desc">{itemData.verify_info?.messages.join(" . ")}</div> */}
        <div className="name">{itemData.name}</div>
        <div className="price">¥{itemData.price}/晚</div>
      </div>
      <div className="bottom">
        <Rate
          disabled
          defaultValue={
            itemData.reviews_count
              ? Math.min(itemData.reviews_count / 20, 5)
              : 5
          }
          style={{ fontSize: "12px", marginInlineEnd: "1px" }}
        />
        <span className="count">{itemData.reviews_count}</span>
        <span className="extra">{itemData.bottom_info?.content}</span>
      </div>
    </ItemWrapper>
  );
});

export default RoomItem;
