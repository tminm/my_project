import React, {
  memo,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { UserCenterWrapper } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder, getOrder, deleteRoom } from "services/modules/order";
import { changeOrderInfoAction } from "store/modules/detail";
import { useNavigate } from "react-router-dom";
import { getRoomInfo } from "services/modules/upload";
import { changeRoomInfoAction } from "store/modules/home";
import { Input, message, Modal } from "antd";
import * as echarts from "echarts";
import { changePasswordApi } from "services";

const UserCenter = memo(() => {
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const [isChange, setIsChange] = useState(false);
  const color = useRef<string>("");

  const chartRef = useRef<HTMLDivElement | null>(null); // 用于存储 ECharts 容器的引用
  // 1. 新增柱状图容器的ref
  const barChartRef = useRef<HTMLDivElement | null>(null);
  // 随机生成背景颜色
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // 模拟收益数据
  const generateEarningsData = () => {
    const months = [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月",
    ];
    const earnings = months.map(() => Math.floor(Math.random() * 10000)); // 随机生成收益数据
    return { months, earnings };
  };

  const renderChart = () => {
    if (chartRef.current && barChartRef.current) {
      const earningsData = generateEarningsData();
      const myChart = echarts.init(chartRef.current);
      const option = {
        title: {
          text: "月度收益统计折线图",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: earningsData.months,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: earningsData.earnings,
            type: "line",
            smooth: true,
          },
        ],
      };
      myChart.setOption(option);

      // 初始化柱状图
      const barChart = echarts.init(barChartRef.current);
      const barOption = {
        title: { text: "月度收益统计柱状图" },
        tooltip: { trigger: "axis" },
        xAxis: {
          type: "category",
          data: earningsData.months,
          axisLabel: { rotate: 45 },
        },
        yAxis: { type: "value" },
        series: [
          {
            data: earningsData.earnings,
            type: "bar",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" },
              ]),
            },
          },
        ],
      };
      barChart.setOption(barOption);

      // // 窗口resize处理
      // const handleResize = () => {
      //   lineChart.resize();
      //   barChart.resize();
      // };
      // window.addEventListener("resize", handleResize);

      // // 清理函数
      // return () => {
      //   window.removeEventListener("resize", handleResize);
      //   lineChart.dispose();
      //   barChart.dispose();
      // };
    }
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
  }, [isChange]);

  useEffect(() => {
    renderChart();
  });

  useEffect(() => {
    color.current = getRandomColor();
  }, []);

  const handleAsscess = (item: any, index: number) => {
    if (localStorage.getItem("orderInfo")) localStorage.removeItem("orderInfo");
    if (localStorage.getItem("index")) localStorage.removeItem("index");
    localStorage.setItem("orderInfo", JSON.stringify(item));
    localStorage.setItem("index", index.toString());
    nav("/asscess");
  };

  // const deleteRoom = (id: number) => {
  //   const newRoomInfo = roomInfo.filter((item: any) => item.id !== id);
  //   setRoomInfo(newRoomInfo);
  // };

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

  const showCancelDialog = (id: number) => {
    setShowDialog(true);
    setOrderId(id);
  };

  const handleCancel = () => {
    setShowDialog(false);
    if (userInfo.role === "guest") {
      cancelOrder(orderId).then((res) => {
        setIsChange(!isChange);
        renderContentBasedOnRole();
      });
    } else {
      deleteRoom(orderId).then((res) => {
        setIsChange(!isChange);
        renderContentBasedOnRole();
      });
    }
  };

  const renderContentBasedOnRole = () => {
    if (userInfo.role === "guest") {
      return (
        <div>
          {userInfo.role === "guest" && orderInfo2 ? (
            orderInfo2.map((item: any, index: number) => (
              <div className="order">
                <div className="order-left">
                  <img
                    src={item.image_url}
                    alt=""
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
                <div className="order-right">
                  <span style={{ display: "block" }}>{item.property_name}</span>
                  <span style={{ display: "block", marginTop: "15px" }}>
                    金额：¥ {item.total_amount} 元
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
                    {item.payment_status}
                  </span>
                  <div
                    className="assess"
                    style={{
                      marginTop: "8px",
                      marginLeft: "21px",
                      color: "#1890ff",
                      cursor: "pointer",
                    }}
                    onClick={() => handleAsscess(orderInfo2[index], index)}
                  >
                    点击此处进行评价
                  </div>
                  <div
                    style={{
                      color: "red",
                      marginLeft: "22px",
                      marginTop: "3px",
                      cursor: "pointer",
                    }}
                    onClick={() => showCancelDialog(item.order_id)}
                  >
                    取消订单
                  </div>
                </div>
              </div>
            ))
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
                  <div style={{ fontWeight: "bold" }}>名称：{item.name}</div>
                  <div className="marTop" style={{ fontWeight: "bold" }}>
                    城市：{item.city}
                  </div>
                  {showInput === item.id ? (
                    <Input
                      type="number"
                      defaultValue={item.price}
                      onBlur={(e) => changeRoomPrice(e, item.id)}
                    />
                  ) : (
                    <div className="marTop" style={{ fontWeight: "bold" }}>
                      价格：¥ {item.price} 元/晚
                    </div>
                  )}
                  <div className="marTop" style={{ fontWeight: "bold" }}>
                    简介：{item.property_details}
                  </div>
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
                    onClick={() => showCancelDialog(item.id)}
                  >
                    下架房源
                  </button>
                </div>
              </div>
            ))}
          </div>
          <h2>收益统计</h2>
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div
              ref={chartRef}
              style={{
                width: "75%",
                height: "400px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
              }}
            />
            <div
              ref={barChartRef}
              style={{
                width: "75%",
                height: "400px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
              }}
            />
          </div>
        </div>
      ) : (
        <div>您还没有发布房源</div>
      );
    }
    return <div>角色未知</div>;
  };

  const changePassword = () => {
    if (newPassword === confirmPassword) {
      const data = {
        id: userInfo.id,
        username: userInfo.username,
        password: newPassword,
      };
      changePasswordApi(data).then(() => {
        alert("密码修改成功");
        setIsModalOpen(false);
      });
    } else {
      alert("两次密码不一致");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  // const fetchEarningsData = async (landlordId) => {
  //   const response = await axios.post("/api/earnings", { landlordId });
  //   return {
  //     months: response.data.map((item) => item.month),
  //     earnings: response.data.map((item) => item.amount),
  //   };
  // };

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
                    backgroundColor: color.current,
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
              <h1>{userInfo.username}</h1>
              <h4>
                身份：{userInfo.role === "guest" ? "旅行家" : "房源发布者"}
              </h4>
              <div>
                {/* 加入时间：{(userInfo.createTime as string).split("T")[0]} */}
                {`加入时间:${userInfo.createTime}`}
              </div>
            </div>
          </div>
          <div className="right">
            <div>
              <div className="phone">
                <h1>联系方式</h1>
                <h4>电话号码</h4>
                <div>{userInfo.phone}</div>
                <h4>邮箱</h4>
                <div>{userInfo.email}</div>
                <button
                  style={{
                    width: "93px",
                    height: "39px",
                    border: "none",
                    background: "#1890ff",
                    color: "#fff",
                    marginTop: "20px",
                    marginLeft: "270px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsModalOpen(true)}
                >
                  修改密码
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <h1>{userInfo.role === "guest" ? "您的订单" : "你的出租房源"}</h1>
          {renderContentBasedOnRole()}
        </div>

        <Modal
          title={"修改密码"}
          visible={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          width={450}
        >
          <div>
            <h4>新密码</h4>
            <Input
              type="password"
              style={{ width: "405px" }}
              onChange={(e) => setNewPassword(e.target.value)}
            ></Input>
            <h4>确认密码</h4>
            <Input
              type="password"
              style={{ width: "405px" }}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Input>
            <button
              style={{
                width: "93px",
                height: "39px",
                border: "none",
                background: "#1890ff",
                color: "#fff",
                marginTop: "20px",
                marginLeft: "270px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => {
                changePassword();
              }}
            >
              确定
            </button>
          </div>
        </Modal>
        {showDialog && (
          <Modal
            title={userInfo.role === "guest" ? "取消订单" : "下架房源"}
            visible={showDialog}
            onCancel={() => setShowDialog(false)}
            footer={null}
            width={450}
          >
            <div>
              <h4>
                {userInfo.role === "guest"
                  ? "您确定要取消该订单吗？"
                  : "您确定要下架该房源吗？"}
              </h4>
              <div style={{ display: "flex" }}>
                <button
                  style={{
                    width: "93px",
                    height: "39px",
                    border: "none",
                    background: "#1890ff",
                    color: "#fff",
                    marginTop: "20px",
                    marginLeft: "200px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleCancel()}
                >
                  确定
                </button>
                <button
                  style={{
                    width: "93px",
                    height: "39px",
                    border: "none",
                    background: "red",
                    color: "#fff",
                    marginTop: "20px",
                    marginLeft: "20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowDialog(false)}
                >
                  取消
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </UserCenterWrapper>
  );
});

export default UserCenter;
