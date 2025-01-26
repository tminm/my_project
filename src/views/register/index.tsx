import React, { useState } from "react";
import "./Register.css";
import { postUserInfo } from "services";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  // 定义状态来存储表单数据
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [role, setRole] = useState<string>("guest");
  const nav = useNavigate();

  // 处理表单提交
  const onRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    // 确认密码是否匹配
    if (password !== confirmPassword) {
      alert("密码和确认密码不一致");
      return;
    }
    try {
      // 假设你的后端接口是 /api/register，使用 POST 方法发送数据
      const response = await postUserInfo(username, password, role);
      if ((response as any).status === "success") {
        nav("/login");
      } else {
        // console.error("注册失败", result);
        // alert(result.message || "注册失败，请重试");
        alert("注册失败，请重试");
      }
    } catch (error) {
      console.error("请求失败", error);
      alert("注册请求失败，请稍后再试");
    }
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
              value={username}
              onChange={(e) => setUsername(e.target.value)} // 更新用户名
              required
            />
          </div>
          <div className="form-item">
            <input
              className="form-input"
              type="password"
              name="password"
              placeholder="密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // 更新密码
              required
            />
          </div>
          <div className="form-item">
            <input
              className="form-input"
              type="password"
              name="confirmPassword"
              placeholder="确认密码"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} // 更新确认密码
              required
            />
          </div>
          <div className="form-item" style={{ marginLeft: "44px" }}>
            <div className="form-radio-group" style={{ display: "flex" }}>
              <label className="form-radio-label">
                <input
                  className="form-radio-input"
                  type="radio"
                  name="role"
                  value="guest"
                  checked={role === "guest"} // 根据 role 更新状态
                  onChange={() => setRole("guest")} // 设置为游客
                  required
                />
                游客
              </label>
              <label
                className="form-radio-label"
                style={{ marginLeft: "221px" }}
              >
                <input
                  className="form-radio-input"
                  type="radio"
                  name="role"
                  value="host"
                  checked={role === "host"} // 根据 role 更新状态
                  onChange={() => setRole("host")} // 设置为房东
                  required
                />
                房东
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="form-button"
            style={{ backgroundColor: "#e51d58" }}
          >
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
