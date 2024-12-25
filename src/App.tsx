import React, { memo } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom"; // 引入 Router
import { useRoutes } from "react-router-dom";
import routes from "./router"; // 路由配置
import AppHeader from "./components/app-header";
import AppFooter from "./components/app-footer";
import useScrollTop from "./hooks/useScrollTop";
import "./App.css";

const App = memo(() => {
  useScrollTop();
  const location = useLocation();

  // 判断是否是登录页面
  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/register";
  return (
    <div className="app">
      {/* <AppHeader /> */}
      {!isLoginPage && <AppHeader />}
      <div className="page">{useRoutes(routes)}</div>
      {!isLoginPage && <AppFooter />}
    </div>
  );
});

export default App;
