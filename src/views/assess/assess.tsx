import React, { memo } from "react";
import { AssessWrapper } from "./style";
import { Flex, Input } from "antd";
import { useSelector } from "react-redux";

const { TextArea } = Input;

const assess = memo(() => {
  const { order } = useSelector(
    (state: {
      detail: { detailInfo: any; order: any };
      home: { goodPriceInfo: any; userInfo: any };
    }) => ({
      order: state.detail.order,
    })
  );
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("Change:", e.target.value);
  };

  const handleAssess = () => {
    alert("发表成功");
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
              src={order.image_url}
              alt=""
              style={{ width: "100px", height: "100px" }}
            />
          </div>
          <div style={{ padding: "17px" }}>{order.property_name}</div>
        </div>
        <Flex vertical gap={32} style={{ marginLeft: "48px" }}>
          <TextArea
            showCount
            maxLength={100}
            onChange={onChange}
            placeholder="disable resize"
            style={{ height: 120, resize: "none", width: 500 }}
          />
        </Flex>
        <button
          style={{ marginLeft: "458px", marginTop: "30px" }}
          onClick={handleAssess}
        >
          确认发布
        </button>
      </div>
    </AssessWrapper>
  );
});

export default assess;
