import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const onLogin = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("登录表单提交");
  };

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
          <button type="submit" className="form-button">
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
