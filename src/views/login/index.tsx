import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { changeUserInfoAction } from "store/modules/home";
import { useDispatch } from "react-redux";
import { changeHeaderConfigAction } from "store/modules/main";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("登录表单提交");
    // 在这里执行登录逻辑
    dispatch(changeUserInfoAction({ username: "陈俊杰", password: "123456" }));
    navigate("/home");
  };

  useEffect(() => {
    // 发送动作，确保使用正确的类型
    dispatch(changeHeaderConfigAction({ isFixed: true, topAlpha: false }));
  }, []);

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">用户登录</h2>
        <p className="login-subtitle">欢迎回来，请登录继续</p>
        <form className="login-form" onSubmit={onLogin}>
          <div className="form-item">
            <input
              className="form-input"
              type="text"
              name="username"
              placeholder="用户名"
              required
            />
          </div>
          <div className="form-item">
            <input
              className="form-input"
              type="password"
              name="password"
              placeholder="密码"
              required
            />
          </div>
          <div className="form-options">
            <label>
              <input type="checkbox" /> 记住我
            </label>
            <a href="/">忘记密码?</a>
          </div>
          <button
            style={{ backgroundColor: "#e51d58" }}
            type="submit"
            className="form-button"
            onClick={onLogin}
          >
            登录
          </button>
        </form>
        <div className="form-footer">
          没有账户？{" "}
          <button
            type="button"
            onClick={handleRegisterRedirect}
            className="form-link"
          >
            立即注册
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
