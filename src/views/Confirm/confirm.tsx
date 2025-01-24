import React, { memo, useState } from "react";
import { ConfirmWrapper } from "./style";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PaymentPage from "views/PaymentPage";

const confirm = memo((props) => {
  const navigator = useNavigate();
  const confirmInfo = useSelector(
    (state: {
      detail: { detailInfo: any; confirmInfo: any };
      home: { goodPriceInfo: any };
    }) => state.detail.confirmInfo
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const handleBooking = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert("订单提交成功！");
      navigator("/userCenter");
    }, 500);
  };
  return (
    <ConfirmWrapper>
      <div className="confirm">
        <div style={{ width: "50%" }}>
          <div
            className="main"
            style={{
              display: "flex",
              alignItems: "center",
              paddingLeft: "332px",
              marginTop: "60px",
              width: "50%",
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
                fill: "none",
                height: "16px",
                width: "16px",
                stroke: "currentcolor",
                strokeWidth: 3,
                overflow: "visible",
                marginRight: "10px",
              }}
            >
              <path fill="none" d="M20 28 8.7 16.7a1 1 0 0 1 0-1.4L20 4"></path>
            </svg>
            <div style={{ fontSize: "30px" }}>确认并支付定金</div>
          </div>
          <div className="tips">
            <div>抢手房源</div>
            <div>此处房源较为抢手</div>
            <svg
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={{
                display: "block",
                height: "32px",
                width: "32px",
                fill: "rgb(227, 28, 95)",
                stroke: "currentcolor",
              }}
            >
              <g stroke="none">
                <path
                  d="m32.62 6 9.526 11.114-18.146 23.921-18.147-23.921 9.526-11.114z"
                  fill-opacity=".2"
                ></path>
                <path d="m34.4599349 2 12.8243129 14.9616983-23.2842478 30.6928721-23.28424779-30.6928721 12.82431289-14.9616983zm-17.9171827 16h-12.52799999l18.25899999 24.069zm27.441 0h-12.528l-5.73 24.069zm-14.583 0h-10.802l5.4012478 22.684zm-15.92-12.86-9.30799999 10.86h11.89399999zm19.253-1.141h-17.468l2.857 12.001h11.754zm1.784 1.141-2.586 10.86h11.894z"></path>
              </g>
            </svg>
          </div>
          <div className="info">
            <h3 style={{ fontSize: "20px" }} className="top">
              您的行程
            </h3>
            <div style={{ fontSize: "18px" }}>
              <div>入住：{confirmInfo.checkInDate} 日</div>
              <div className="top">退房：{confirmInfo.checkOutDate} 日</div>
            </div>
            <div style={{ fontSize: "18px", marginTop: "20px" }}>
              <h3 style={{ fontSize: "20px" }}>房客：</h3>
              <div className="top">{confirmInfo.roomCount}人</div>
            </div>
            <div style={{ fontSize: "18px", marginTop: "30px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 35 32"
                  aria-label="支付宝"
                  role="img"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "24px",
                    width: "24px",
                    marginRight: "8px",
                  }}
                >
                  <g fill="#108EE9" fill-rule="evenodd">
                    <path d="M34.24 6.15v15.76s-8.97-2.64-10.95-3.32a24.66 24.66 0 0 0 2.76-6.65h-6.79v-2.2h8.32V8.37h-8.32v-3.7h-3.2c-.57 0-.64.5-.64.5v3.2h-7.8v1.35h7.8v2.21h-6.4v1.23h12.93a21.64 21.64 0 0 1-1.85 4.35l-.99-.31c-2.34-.76-3.99-1.3-7.14-1.58-6.79-.61-8.35 2.97-8.6 5.16-.36 3.33 2.71 6.06 7.31 6.06s7.66-2.04 10.57-5.43c3.78 1.73 11 4.73 12.82 5.49l.07.03a6.34 6.34 0 0 1-6.3 5.06H7.36a6.28 6.28 0 0 1-6.4-6.16V6.15C.96 2.75 3.83 0 7.36 0h20.48c3.53 0 6.4 2.76 6.4 6.15z"></path>
                    <path d="M9.16 17.72c-2.7 0-4.1 1.6-4.36 2.83-.26 1.24.51 4.19 5.37 4.19 3 0 5.88-1.75 8.22-4.7-3.33-1.55-6.12-2.32-9.23-2.32z"></path>
                  </g>
                </svg>
                <label>
                  <input
                    type="radio"
                    value="支付宝"
                    checked={selectedPaymentMethod === "支付宝"}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    disabled={isProcessing}
                  />
                  支付宝
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "8px",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 34 30"
                  aria-label="微信支付"
                  role="img"
                  focusable="false"
                  style={{
                    display: "block",
                    height: "24px",
                    width: "24px",
                    marginRight: "8px",
                  }}
                >
                  <path
                    fill="#1AAD19"
                    d="M12.54 18.98a1.08 1.08 0 0 1-1.46-.46l-.07-.16L8 11.56a.6.6 0 0 1-.06-.23.56.56 0 0 1 .56-.57c.12 0 .24.04.33.11l3.55 2.6a1.62 1.62 0 0 0 1.47.18L30.58 6c-3-3.63-7.93-6-13.52-6C7.9 0 .5 6.34.5 14.17c0 4.27 2.23 8.11 5.72 10.7a1.14 1.14 0 0 1 .4 1.3l-.74 2.85c-.03.13-.09.27-.09.41a.56.56 0 0 0 .55.57c.12 0 .22-.05.32-.1l3.63-2.15a1.6 1.6 0 0 1 1.37-.19c1.68.5 3.5.78 5.4.78 9.14 0 16.56-6.35 16.56-14.17 0-2.37-.69-4.6-1.89-6.57L12.66 18.9l-.12.08z"
                  ></path>
                </svg>
                <label>
                  <input
                    type="radio"
                    value="微信"
                    checked={selectedPaymentMethod === "微信"}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    disabled={isProcessing}
                  />
                  微信
                </label>
              </div>
            </div>
            <button
              style={{
                backgroundColor: "#e51d58",
                borderColor: "#e51d58",
                width: "86%",
                color: "#fff",
                height: "48px",
                marginTop: "40px",
              }}
              onClick={handleBooking}
            >
              {isProcessing ? "处理中..." : "确认并支付定金"}
            </button>
          </div>
        </div>
        <div
          className="rightcontent"
          style={{
            marginTop: "66px",
            border: "#ccc solid 1px",
            borderRadius: "20px",
            width: "32%",
            padding: "30px",
            marginLeft: "60px",
          }}
        >
          <div className="room">
            <img src={confirmInfo.pictureUrl} alt="" className="img" />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
              }}
            >
              <div className="top">佛山</div>
              <div className="top">民宿</div>
              <div className="top">4.92 分 超赞房东</div>
            </div>
          </div>
          <div className="price">
            <h3>价格详情</h3>
            <div className="price-detail">
              <span>
                ￥{confirmInfo.price} x {confirmInfo.totalDays} 晚
              </span>
              <span>￥{confirmInfo.price * confirmInfo.totalDays}</span>
            </div>
            <div className="price-detail">
              <span>清洁费</span>
              <span>¥ 100</span>
            </div>
            <div className="price-detail">
              <span>服务费费</span>
              <span>¥ 100</span>
            </div>
            <div
              className="price-detail"
              style={{
                marginTop: "40px",
                paddingTop: "34px",
                borderTop: "1px solid #ccc",
              }}
            >
              <span>总价</span>
              <span>¥ {confirmInfo.price * confirmInfo.totalDays + 200}</span>
            </div>
          </div>
        </div>
      </div>
    </ConfirmWrapper>
  );
});

export default confirm;
