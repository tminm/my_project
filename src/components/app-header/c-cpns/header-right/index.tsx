import React, { memo, useState, useEffect, use } from "react";
import { RightWrapper } from "./style";
import IconGlobal from "../../../../assets/svg/icon-global";
import IconProfileMenu from "../../../../assets/svg/icon-profile-menu";
import IconProfileAvatar from "../../../../assets/svg/icon-profile-avatar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeLoginInfoAction } from "store/modules/entire/createActions";
import { changeUserInfoAction } from "store/modules/home";
import { changeHeaderConfigAction } from "store/modules/main";
import Modal from "antd/es/modal/Modal";
import ChatWidget from "components/AIChat/ChatWidget";

const HeaderRight = memo(() => {
  const [showPanel, setShowPanel] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  let { userInfo } = useSelector((state: any) => ({
    userInfo: state.home.userInfo, // 根据实际 Redux 状态修改路径
  }));

  if (!userInfo.id && userInfo.username !== "") {
    userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  }
  // 副作用代码
  useEffect(() => {
    function windowHandleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest(".panel") && !target.closest(".profile")) {
        setShowPanel(false);
      }
    }

    window.addEventListener("click", windowHandleClick, true);

    return () => {
      window.removeEventListener("click", windowHandleClick, true);
    };
  }, []);

  // 处理函数
  function profileClickHandle() {
    setShowPanel(true);
  }

  function handleLogin() {
    navigate("/login");
  }

  function handleUserCenter() {
    dispatch(changeHeaderConfigAction({ isFixed: false, topAlpha: false }));
    dispatch(changeLoginInfoAction());
    navigate("/userCenter");
  }

  function handleunLogin(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.stopPropagation();
    dispatch(changeUserInfoAction({ username: "", password: "" }));
    localStorage.removeItem("user");
  }

  const handleRegister = () => {
    navigate("/register");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const navToRomm = () => {
    dispatch(changeHeaderConfigAction({ isFixed: false, topAlpha: false }));
    navigate("/room");
  };
  return (
    <RightWrapper>
      <div className="btns">
        {!userInfo.username && (
          <span className="btn" onClick={handleLogin}>
            登录
          </span>
        )}
        {!userInfo.username && (
          <span className="btn" onClick={handleRegister}>
            注册
          </span>
        )}
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
              {
                //判断用户是否登录
                userInfo.username ? (
                  <>
                    <div className="item" onClick={handleUserCenter}>
                      个人中心
                    </div>
                    <div onClick={handleunLogin}>退出登录</div>
                  </>
                ) : (
                  <>
                    <div className="item" onClick={() => navigate("/login")}>
                      登录
                    </div>
                    <div className="item" onClick={() => navigate("/register")}>
                      注册
                    </div>
                  </>
                )
              }
            </div>
            <div className="bottom">
              {userInfo.role === "host" && (
                <div className="item" onClick={navToRomm}>
                  出租房源
                </div>
              )}
              <div
                className="item"
                onClick={() => {
                  dispatch(
                    changeHeaderConfigAction({
                      isFixed: false,
                      topAlpha: false,
                    })
                  );
                  navigate("/experience");
                }}
              >
                互动区
              </div>
              <div
                className="item"
                // onClick={() => {
                //   dispatch(
                //     changeHeaderConfigAction({
                //       isFixed: false,
                //       topAlpha: false,
                //     })
                //   );
                //   navigate("/chat");
                // }}
                onClick={() => setIsModalOpen(true)}
              >
                AI问答
              </div>
              <div className="item">帮助</div>
            </div>
          </div>
        )}
        <Modal
          visible={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          width={809}
        >
          <ChatWidget></ChatWidget>
        </Modal>
      </div>
    </RightWrapper>
  );
});

export default HeaderRight;
