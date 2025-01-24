import React, { memo } from "react";
import { UserCenterWrapper } from "./style";
import { useSelector } from "react-redux";

const userCenter = memo(() => {
  const { userInfo } = useSelector((state: any) => ({
    userInfo: state.home.userInfo, // 根据实际 Redux 状态修改路径
    detailInfo: state.detail.detailInfo,
  }));
  const confirmInfo = useSelector(
    (state: {
      detail: { detailInfo: any; confirmInfo: any };
      home: { goodPriceInfo: any };
    }) => state.detail.confirmInfo
  );
  // 随机生成背景颜色
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  return (
    <UserCenterWrapper>
      <div className="content">
        <div style={{ fontSize: "40px", padding: "20px" }}>个人中心</div>
        <div className="top">
          <div className="left">
            <div className="userInfo">
              {userInfo && userInfo.username ? ( // 显示用户名首字母
                <div
                  style={{
                    width: "109px",
                    height: "112px",
                    borderRadius: "50%",
                    backgroundColor: getRandomColor(),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "36px",
                  }}
                >
                  {userInfo.username.charAt(0).toUpperCase()}
                </div>
              ) : (
                // 显示默认 SVG 头像
                <div
                  style={{ width: "32px", height: "32px", color: "#717171" }}
                >
                  <svg
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="presentation"
                    focusable="false"
                    style={{
                      display: "block",
                      height: "32px",
                      width: "32px",
                      fill: "currentcolor",
                    }}
                  >
                    <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
                  </svg>
                </div>
              )}
              <h1>旅行家</h1>
              <h4>房客或体验参与者</h4>
              <div>加入时间：{new Date().toLocaleDateString()}</div>
            </div>
          </div>
          <div className="right">
            <div>
              <div className="phone">
                <h1>联系方式</h1>
                <h4>电话号码</h4>
                <div>10086</div>
                <h4>邮箱</h4>
                <div>123456789@qq.com</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <h1>您的待入住订单</h1>
          <div className="order">
            <div className="order-left">
              <img
                src={confirmInfo.pictureUrl}
                alt=""
                style={{ width: "100px", height: "100px" }}
              />
            </div>
            <div className="order-right">
              <span style={{ display: "block" }}>{confirmInfo.name}</span>
              <span style={{ display: "block", marginTop: "15px" }}>
                金额：¥ {confirmInfo.totalPrice} 元
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "15px",
                  // marginLeft: "8px",
                }}
              >
                状态:
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
                    marginLeft: "8px",
                    marginRight: "8px",
                  }}
                >
                  <g fill="#108EE9" fill-rule="evenodd">
                    <path d="M34.24 6.15v15.76s-8.97-2.64-10.95-3.32a24.66 24.66 0 0 0 2.76-6.65h-6.79v-2.2h8.32V8.37h-8.32v-3.7h-3.2c-.57 0-.64.5-.64.5v3.2h-7.8v1.35h7.8v2.21h-6.4v1.23h12.93a21.64 21.64 0 0 1-1.85 4.35l-.99-.31c-2.34-.76-3.99-1.3-7.14-1.58-6.79-.61-8.35 2.97-8.6 5.16-.36 3.33 2.71 6.06 7.31 6.06s7.66-2.04 10.57-5.43c3.78 1.73 11 4.73 12.82 5.49l.07.03a6.34 6.34 0 0 1-6.3 5.06H7.36a6.28 6.28 0 0 1-6.4-6.16V6.15C.96 2.75 3.83 0 7.36 0h20.48c3.53 0 6.4 2.76 6.4 6.15z"></path>
                    <path d="M9.16 17.72c-2.7 0-4.1 1.6-4.36 2.83-.26 1.24.51 4.19 5.37 4.19 3 0 5.88-1.75 8.22-4.7-3.33-1.55-6.12-2.32-9.23-2.32z"></path>
                  </g>
                </svg>
                {"  "}
                已支付
              </span>
            </div>
          </div>
        </div>
      </div>
    </UserCenterWrapper>
  );
});

export default userCenter;
