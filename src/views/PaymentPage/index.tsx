import React, { useState } from "react";
// import "./PaymentPage.css"; // 假设你有一个 CSS 文件来美化页面
import { PaymentPageWrapper } from "./PaymentPage";

const PaymentPage: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false); // 是否正在处理中
  const [paymentStatus, setPaymentStatus] = useState<string>(""); // 支付状态信息
  const [totalAmount] = useState<number>(200); // 示例总金额
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>(""); // 选择的支付方式

  // 模拟支付请求
  const handlePayment = () => {
    if (!selectedPaymentMethod) {
      setPaymentStatus("请选择支付方式");
      return;
    }

    setIsProcessing(true); // 开始处理支付
    setPaymentStatus(""); // 清空之前的支付状态

    // 模拟延迟 3 秒钟支付过程
    setTimeout(() => {
      const isSuccess = Math.random() > 0.5; // 50% 概率支付成功
      setIsProcessing(false); // 结束支付过程

      // 根据支付成功与否更新状态
      if (isSuccess) {
        setPaymentStatus(
          `支付成功！您的预定已确认。支付方式：${selectedPaymentMethod}`
        );
      } else {
        setPaymentStatus("支付失败，请重试。");
      }
    }, 3000);
  };

  return (
    <PaymentPageWrapper>
      <div className="payment-container">
        <h2>订单金额: ¥{totalAmount}</h2>

        {/* 支付方式选择 */}
        <div className="payment-methods">
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
          <label>
            <input
              type="radio"
              value="银联"
              checked={selectedPaymentMethod === "银联"}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              disabled={isProcessing}
            />
            银联
          </label>
        </div>

        {/* 支付按钮 */}
        {/* <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="payment-button"
        >
          {isProcessing ? "处理中..." : "模拟支付"}
        </button> */}

        {/* 显示支付状态 */}
        {paymentStatus && <p>{paymentStatus}</p>}
      </div>
    </PaymentPageWrapper>
  );
};

export default PaymentPage;
