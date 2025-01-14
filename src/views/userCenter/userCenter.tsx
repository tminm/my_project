import React, { memo } from "react";
import { UserCenterWrapper } from "./style";
import { useSelector } from "react-redux";

const userCenter = memo(() => {
  const { userInfo } = useSelector((state: any) => ({
    userInfo: state.home.userInfo, // 根据实际 Redux 状态修改路径
  }));
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
        <div style={{ fontSize: "40px", padding: "50px" }}>个人中心</div>
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
          <h1>创建你的个人资料</h1>
          个人资料是你的重要信息，会体现在每笔订单中。请创建个人资料，让其他房东/体验达人和房客/体验参与者了解你的基⁠本⁠情⁠况。
        </div>
      </div>
    </UserCenterWrapper>
  );
});

export default userCenter;
