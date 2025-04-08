import React, { memo } from "react";
import { AssessWrapper } from "./style";
import { Flex, Input } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface orderInfo {
  image_url: string;
  property_name: string;
  order_id: number;
  payment_status: number;
  total_amount: string;
}

const { TextArea } = Input;
const assess = memo(() => {
  let { order } = useSelector(
    (state: {
      detail: { detailInfo: any; order: any };
      home: { goodPriceInfo: any; userInfo: any };
    }) => ({
      order: state.detail.order as orderInfo[],
    })
  );

  const nav = useNavigate();
  let index: number = 0;

  if (Object.keys(order).length === 0) {
    order = [];
    const orderInfo = JSON.parse(localStorage.getItem("orderInfo") || "[]");
    order.push(orderInfo);
  } else {
    index = localStorage.getItem("index")
      ? Number(localStorage.getItem("index"))
      : 0;
  }

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("Change:", e.target.value);
  };

  const handleAssess = () => {
    alert("发表成功");
    nav("/userCenter");
  };
  return (
    <AssessWrapper>
      <div className="asscess">
        <h4>请对该房源入住体验发表评价</h4>
        <div
          style={{
            display: "flex",
            marginBottom: "20px",
          }}
        >
          <div>
            <img
              src={order[index].image_url}
              alt=""
              style={{ width: "100px", height: "100px" }}
            />
          </div>
          <div style={{ padding: "17px" }}>{order[index].property_name}</div>
        </div>
        <Flex vertical gap={32}>
          <TextArea
            showCount
            maxLength={100}
            onChange={onChange}
            placeholder="请输入评价内容..."
            style={{ height: 120, resize: "none", width: 500 }}
          />
        </Flex>
        <button
          style={{
            marginLeft: "418px",
            marginTop: "30px",
            backgroundColor: "#1890ff",
            color: "#fff",
            border: "none",
            width: "87px",
            height: "40px",
            borderRadius: "5px",
          }}
          onClick={handleAssess}
        >
          确认发布
        </button>
      </div>
    </AssessWrapper>
  );
});

export default assess;
