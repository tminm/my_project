import React, { memo, useState, useEffect } from "react";
import { RightWrapper } from "./style";
import IconGlobal from "../../../../assets/svg/icon-global";
import IconProfileMenu from "../../../../assets/svg/icon-profile-menu";
import IconProfileAvatar from "../../../../assets/svg/icon-profile-avatar";
import { useNavigate } from "react-router-dom";

const HeaderRight = memo(() => {
  const [showPanel, setShowPanel] = useState(false);
  const navigate = useNavigate();
  // 副作用代码
  useEffect(() => {
    function windowHandleClick() {
      setShowPanel(false);
    }

    window.addEventListener("click", windowHandleClick, true);

    //取消监听
    return () => {
      window.removeEventListener("click", windowHandleClick, true);
    };
  }, []);

  // 处理函数
  function profileClickHandle() {
    setShowPanel(true);
  }

  function handleLogin() {
    //编程式导航跳转
    navigate("/login");
  }
  return (
    <RightWrapper>
      <div className="btns">
        <span className="btn" onClick={handleLogin}>
          登录
        </span>
        <span className="btn">注册</span>
        <span>
          <IconGlobal></IconGlobal>
        </span>
      </div>
      <div className="profile" onClick={profileClickHandle}>
        <IconProfileMenu></IconProfileMenu>
        <IconProfileAvatar></IconProfileAvatar>

        {showPanel && (
          <div className="panel">
            <div className="top">
              <div className="item register">注册</div>
              <div className="item logo">登录</div>
            </div>
            <div className="bottom">
              <div className="item">出租房源</div>
              <div className="item">开展体验</div>
              <div className="item">帮助</div>
            </div>
          </div>
        )}
      </div>
    </RightWrapper>
  );
});

export default HeaderRight;
