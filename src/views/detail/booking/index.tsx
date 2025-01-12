import React, { useState } from "react";
import "./Booking.css"; // 引入 CSS 样式

const Booking = () => {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);

  const handleBooking = () => {
    if (!checkInDate || !checkOutDate) {
      alert("请选择入住和退房日期！");
      return;
    }
    alert(
      `预订成功！\n入住日期：${checkInDate}\n退房日期：${checkOutDate}\n人数：${guests}`
    );
  };

  return (
    <div className="booking">
      <h1 className="title">民宿预订</h1>

      <div className="info">
        <img
          src="https://via.placeholder.com/300x200"
          alt="民宿图片"
          className="thumbnail"
        />
        <div className="details">
          <h2>温馨小屋</h2>
          <p>地址：云南丽江古城</p>
          <p>价格：¥350/晚</p>
        </div>
      </div>

      <div className="form">
        <label>
          入住日期：
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
        </label>
        <label>
          退房日期：
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
        </label>
        <label>
          入住人数：
          <input
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
          />
        </label>
      </div>

      <button className="book-button" onClick={handleBooking}>
        立即预订
      </button>
    </div>
  );
};

export default Booking;
