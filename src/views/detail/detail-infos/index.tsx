import React, { memo, useMemo, useState } from "react";
import { InfosWrapper } from "./style";
import { useDispatch, useSelector } from "react-redux";
import Booking from "../booking";
import { DatePicker, InputNumber, Button } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { changeConfirmInfoAction } from "store/modules/detail";

const DetailInfos = memo(() => {
  const { detailInfo } = useSelector(
    (state: { detail: { detailInfo: any }; home: { goodPriceInfo: any } }) => ({
      detailInfo: state.detail.detailInfo,
    })
  );

  // 使用React状态管理用户选择的日期和房间数量
  const [checkInDate, setCheckInDate] = useState<moment.Moment | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<moment.Moment | null>(null);
  const [roomCount, setRoomCount] = useState<number>(1);
  const navigator = useNavigate();
  const disPatch = useDispatch();
  // 计算总天数
  const totalDays = useMemo(() => {
    if (checkInDate && checkOutDate) {
      return checkOutDate.diff(checkInDate, "days");
    }
    return 0;
  }, [checkInDate, checkOutDate]);

  // 计算总价
  const totalPrice = useMemo(() => {
    const nightlyPrice = detailInfo.price || 0; // 从 `detailInfo` 获取每晚价格
    return totalDays * nightlyPrice * roomCount;
  }, [totalDays, roomCount, detailInfo.price]);

  // 提交预订的事件处理函数
  const handleBooking = () => {
    if (!checkInDate || !checkOutDate) {
      alert("请先选择入住和退房时间！");
      return;
    }

    if (!roomCount) {
      alert("请先选择房间数量！");
    }

    const bookingInfo = {
      checkInDate: checkInDate.format("YYYY-MM-DD"),
      checkOutDate: checkOutDate.format("YYYY-MM-DD"),
      roomCount,
      totalPrice,
      pictureUrl: detailInfo.picture_url,
      price: detailInfo.price,
      //天数
      totalDays,
      name: detailInfo.name,
    };

    disPatch(changeConfirmInfoAction(bookingInfo));
    navigator("/confirm");
  };
  console.log(detailInfo);
  return (
    <InfosWrapper>
      <div className="infos">
        <div className="roomInfo">
          {/* <h3>{detailInfo.name.replace("2.", "")}</h3> */}
          <h3>{detailInfo.name}</h3>
          <p style={{ paddingLeft: "105px" }}>
            {/* {detailInfo.verify_info.messages.join(" · ")} */}
          </p>
          <div className="score">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={{
                display: "block",
                height: "16px",
                width: "16px",
                fill: "currentcolor",
                marginRight: "8px", // 给SVG和其他内容之间添加间距
              }}
            >
              <path
                fillRule="evenodd"
                d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"
              ></path>
            </svg>
            <span style={{ marginRight: "8px" }}>4.92</span>{" "}
            {/* 为数字和下一个文字之间添加间距 */}
            <span>
              <a href="#">{detailInfo.reviews_count}条评价</a>
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px", // 控制列间距
              marginTop: "25px", // 控制行间距
            }}
          >
            {[
              {
                icon: "树屋",
                path: "m16.36 1.07.11.05 13 7-.94 1.76L26 8.52V18h4v2h-4.63L19 25.46V30h-2v-2h-2v2h-2v-4.54L6.63 20H2v-2h4V8.52L3.47 9.88l-.94-1.76 13-7a1 1 0 0 1 .83-.05zM15 24v2h2v-2zm-2-4H9.7l3.3 2.83zm9.3 0H19v2.83zM17 20h-2v2h2zm0-7h-2v5h2zm-1-9.86-8 4.3V18h5v-6a1 1 0 0 1 .88-1H18a1 1 0 0 1 1 .88V18h5V7.44zM16 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z",
              },
              {
                icon: "超赞房东",
                path: "M16 17a7 7 0 1 1 0 14 7 7 0 0 1 0-14zm0 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM25.67.33a2 2 0 0 1 2 1.85v6.54a2 2 0 0 1-.97 1.7l-.14.08-9.67 4.84a2 2 0 0 1-1.61.07l-.17-.07-9.67-4.84a2 2 0 0 1-1.1-1.62V2.33a2 2 0 0 1 1.84-2h.15zm0 2H6.33v6.39L16 13.55l9.67-4.83z",
              },
              {
                icon: "地段优越",
                path: "M16 0a12 12 0 0 1 12 12c0 6.34-3.81 12.75-11.35 19.26l-.65.56-1.08-.93C7.67 24.5 4 18.22 4 12 4 5.42 9.4 0 16 0zm0 2C10.5 2 6 6.53 6 12c0 5.44 3.25 11.12 9.83 17.02l.17.15.58-.52C22.75 23 25.87 17.55 26 12.33V12A10 10 0 0 0 16 2zm0 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
              },
              {
                icon: "48小时内免费取消",
                path: "M11.67 0v1.67h8.66V0h2v1.67h6a2 2 0 0 1 2 1.85v16.07a2 2 0 0 1-.46 1.28l-.12.13L21 29.75a2 2 0 0 1-1.24.58H6.67a5 5 0 0 1-5-4.78V3.67a2 2 0 0 1 1.85-2h6.15V0zm16.66 11.67H3.67v13.66a3 3 0 0 0 2.82 3h11.18v-5.66a5 5 0 0 1 4.78-5h5.88zm-.08 8h-5.58a3 3 0 0 0-3 2.82v5.76zm-18.58-16h-6v6h24.66v-6h-6v1.66h-2V3.67h-8.66v1.66h-2z",
              },
              {
                icon: "自助入住",
                path: "M24.33 1.67a2 2 0 0 1 2 1.85v24.81h3v2H2.67v-2h3V3.67a2 2 0 0 1 1.85-2h.15zm-4 2H7.67v24.66h12.66zm4 0h-2v24.66h2zm-7 11a1.33 1.33 0 1 1 0 2.66 1.33 1.33 0 0 1 0-2.66z",
              },
              {
                icon: "行李寄存",
                path: "M30 29v2H2v-2zM20 1a2 2 0 0 1 2 1.85V5h3a5 5 0 0 1 5 4.78V22a5 5 0 0 1-4.78 5H7a5 5 0 0 1-5-4.78V10a5 5 0 0 1 4.78-5H10V3a2 2 0 0 1 1.85-2H12zm5 6H7a3 3 0 0 0-3 2.82V22a3 3 0 0 0 2.82 3H25a3 3 0 0 0 3-2.82V10a3 3 0 0 0-3-3zm-8 2v9.5l3.3-3.3 1.4 1.42-4.64 4.65-.11.1a1.5 1.5 0 0 1-1.9 0l-.11-.1-4.65-4.65 1.42-1.41L15 18.5V9zm3-6h-8v2h8z",
              },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "calc(50% - 8px)", // 每行两个
                  gap: "8px", // 图标和文字的间距
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: "block",
                    fill: "currentcolor",
                    height: "20px",
                    width: "20px",
                  }}
                >
                  <path d={item.path} />
                </svg>
                <span>{item.icon}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="booking">
          <div className="booking-wrapper">
            <h3>
              {detailInfo.price_format}
              {" /晚"}
            </h3>
            <div style={{ marginBottom: "16px" }}>
              <label>入住时间：</label>
              <DatePicker
                value={checkInDate}
                onChange={setCheckInDate}
                disabledDate={(current) =>
                  current && current < moment().startOf("day")
                }
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label>退房时间：</label>
              <DatePicker
                value={checkOutDate}
                onChange={setCheckOutDate}
                disabledDate={(current) =>
                  current && (!checkInDate || current <= checkInDate)
                }
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label>房间数量：</label>
              <InputNumber
                min={1}
                max={10}
                value={roomCount}
                onChange={(value) => setRoomCount(value || 1)}
              />
            </div>
            <button
              style={{
                backgroundColor: "#e51d58",
                borderColor: "#e51d58",
                width: "100%",
                color: "#fff",
                height: "48px",
              }}
              onClick={handleBooking}
            >
              预订
            </button>
            <div style={{ marginBottom: "16px" }}>
              <p>总天数：{totalDays} 晚</p>
              <p>总费用：{totalPrice} 元</p>
              <p style={{ color: "gray" }}>您现在不会被收费</p>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </InfosWrapper>
  );
});

export default DetailInfos;
