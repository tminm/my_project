import React, { memo, useLayoutEffect, useState } from "react";
import { UserCenterWrapper } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "services/modules/order";
import { changeOrderInfoAction } from "store/modules/detail";
import { useNavigate } from "react-router-dom";
import { getRoomInfo } from "services/modules/upload";
import { changeRoomInfoAction } from "store/modules/home";
import { Input } from "antd";

const UserCenter = memo(() => {
  console.log("UserCenter");
  let userInfo = useSelector((state: any) => state.home.userInfo);
  if (!userInfo.id) {
    const storedUserInfo = localStorage.getItem("user");
    userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : {};
  }

  const [orderInfo2, setOrderInfo] = useState<any>(null);
  const [roomInfo, setRoomInfo] = useState<any>(null);
  const [showInput, setShowInput] = useState<number | null>(null); // 记录显示哪个房间的输入框
  const dispatch = useDispatch();
  const nav = useNavigate();

  // 随机生成背景颜色
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useLayoutEffect(() => {
    if (userInfo.role === "guest") {
      getOrder(userInfo.id).then((res) => {
        setOrderInfo(res.data);
        dispatch(changeOrderInfoAction(res.data));
      });
    } else {
      getRoomInfo(userInfo.id).then((res) => {
        setRoomInfo(res.data);
        dispatch(changeRoomInfoAction(res.data));
      });
    }
  }, []);

  const handleAsscess = () => {
    nav("/asscess");
  };

  const deleteRoom = (id: number) => {
    const newRoomInfo = roomInfo.filter((item: any) => item.id !== id);
    setRoomInfo(newRoomInfo);
  };

  const changeRoomPrice = (e: any, id: number) => {
    const newRoomInfo = roomInfo.map((item: any) => {
      if (item.id === id) {
        //不能直接修改
        const newItem = { ...item };
        newItem.price = e.target.value;
        return newItem;
      }
      return item;
    });
    setRoomInfo(newRoomInfo);
    setShowInput(null); // 修改价格后关闭输入框
  };

  const renderContentBasedOnRole = () => {
    if (userInfo.role === "guest") {
      return (
        <div>
          {userInfo.role === "guest" && orderInfo2 ? (
            <div className="order">
              <div className="order-left">
                <img
                  src={orderInfo2.image_url}
                  alt=""
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
              <div className="order-right">
                <span style={{ display: "block" }}>
                  {orderInfo2.property_name}
                </span>
                <span style={{ display: "block", marginTop: "15px" }}>
                  金额：¥ {orderInfo2.total_amount} 元
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "15px",
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
                  {orderInfo2.payment_status}
                </span>
                <div
                  className="assess"
                  style={{
                    marginTop: "8px",
                    marginLeft: "21px",
                    color: "#1890ff",
                    cursor: "pointer",
                  }}
                  onClick={handleAsscess}
                >
                  点击此处进行评价
                </div>
              </div>
            </div>
          ) : (
            <div>您还没有订单</div>
          )}
        </div>
      );
    } else if (userInfo.role === "host") {
      return roomInfo ? (
        <div>
          <h1>房源信息</h1>
          <div style={{ width: "980px" }}>
            {roomInfo.map((item: any) => (
              <div
                key={item.id}
                className="room"
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  marginBottom: "10px",
                }}
              >
                <div className="room-img">
                  <img
                    src={item.picture_url}
                    alt="room"
                    style={{ width: "200px" }}
                  />
                </div>
                <div className="room-info" style={{ marginLeft: "77px" }}>
                  <h1>名称：{item.name}</h1>
                  <h4>城市：{item.city}</h4>
                  {showInput === item.id ? (
                    <Input
                      type="number"
                      defaultValue={item.price}
                      onBlur={(e) => changeRoomPrice(e, item.id)}
                    />
                  ) : (
                    <h4>价格：¥ {item.price} 元/晚</h4>
                  )}
                  <h4>简介：{item.property_details}</h4>
                </div>
                <div
                  style={{ marginLeft: "300px", display: "flex", gap: "15px" }}
                >
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "#1890ff",
                      border: "none",
                      color: "#fff",
                      padding: "5px 10px",
                      borderRadius: "5px",
                    }}
                    onClick={() => setShowInput(item.id)} // 设置当前房间的输入框显示
                  >
                    修改价格
                  </button>
                  <button
                    className="btn"
                    style={{
                      backgroundColor: "#ff0000",
                      border: "none",
                      color: "#fff",
                      padding: "5px 10px",
                      borderRadius: "5px",
                    }}
                    onClick={() => deleteRoom(item.id)}
                  >
                    下架房源
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>您还没有发布房源</div>
      );
    }
    return <div>角色未知</div>;
  };

  return (
    <UserCenterWrapper>
      <div className="content">
        <div style={{ fontSize: "40px", padding: "20px" }}>个人中心</div>
        <div className="top">
          <div className="left">
            <div className="userInfo">
              {userInfo && userInfo.username ? (
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
          <h1>{userInfo.role === "guest" ? "您的订单" : "你的出租房源"}</h1>
          {renderContentBasedOnRole()}
        </div>
      </div>
    </UserCenterWrapper>
  );
});

export default UserCenter;
