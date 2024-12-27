import React from "react";
import "./Register.css";

const Register: React.FC = () => {
  const onRegister = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("注册表单提交");
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">用户注册</h2>
        <p className="register-subtitle">创建新账户</p>
        <form className="register-form" onSubmit={onRegister}>
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
          <div className="form-item">
            <input
              className="form-input"
              type="password"
              name="confirmPassword"
              placeholder="确认密码"
              required
            />
          </div>
          <button type="submit" className="form-button">
            注册
          </button>
        </form>
        <div className="form-footer">
          已有账户？{" "}
          <a href="/login" className="form-link">
            立即登录
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
