import React, { memo } from "react";
// import "./style.css";
import img from "./23139893_picture_76588ada-cbe0-4e11-af6f-2180534a9886.jpeg";
import { ConfirmWrapper } from "./style";

const confirm = memo((props) => {
  const handleBooking = () => {
    alert("预订成功");
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
            <div style={{ fontSize: "30px" }}>确认订单并提交</div>
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
              <div>日期</div>
              <div className="top">10月10日</div>
            </div>
            <div style={{ fontSize: "18px", marginTop: "20px" }}>
              <div>房客</div>
              <div className="top">1位房客</div>
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
              确认并提交
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
            <img src={img} alt="" className="img" />
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
              <span>￥1,784.40 x 5晚</span>
              <span>￥8,922.00</span>
            </div>
            <div className="price-detail">
              <span>清洁费</span>
              <span>¥100</span>
            </div>
            <div className="price-detail">
              <span>服务费费</span>
              <span>¥100</span>
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
              <span>¥100</span>
            </div>
          </div>
        </div>
      </div>
    </ConfirmWrapper>
  );
});

export default confirm;
