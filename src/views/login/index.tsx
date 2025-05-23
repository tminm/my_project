import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { changeUserInfoAction, fetchHomeDataAction } from "store/modules/home";
import { useDispatch } from "react-redux";
import { changeHeaderConfigAction } from "store/modules/main";
import { getLoginInfo } from "services";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [RememberMe, setRememberMe] = useState(false);

  /**
   * 处理登录表单的提交
   * @param {React.FormEvent} event - 事件对象
   */
  const onLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!username || !password) {
      alert("请检查用户名和密码是否填写完整");
      return;
    }
    //发送登录请求
    const result: any = await getLoginInfo(username, password);
    if (result.code === -1) {
      alert("密码错误，请重试");
      navigate("/login");
      setPassword("");
      return;
    }

    dispatch(changeUserInfoAction(result.user));
    localStorage.setItem("user", JSON.stringify(result.user));
    if (RememberMe) {
    }
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-options" style={{ marginLeft: "324px" }}>
            <label>
              <input type="checkbox" /> 记住我
            </label>
            {/* <a href="/">忘记密码?</a> */}
          </div>
          <button
            style={{ backgroundColor: "#e51d58" }}
            type="submit"
            className="form-button"
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
