import React, { memo } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import routes from "./router";
import AppHeader from "./components/app-header";
import AppFooter from "./components/app-footer";
import useScrollTop from "./hooks/useScrollTop";
import "./App.css";

const App = memo(() => {
  useScrollTop();
  const location = useLocation();

  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="app">
      {/* 全局导航栏 */}
      {!isLoginPage && <AppHeader />}

      {/* 页面内容 */}
      <div className="page">{useRoutes(routes)}</div>

      {/* 全局页脚 */}
      {!isLoginPage && <AppFooter />}
    </div>
  );
});

export default App;
