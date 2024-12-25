import React, { Suspense, LazyExoticComponent } from "react";
import { Navigate } from "react-router-dom";
import Demo from "../views/demo";

// 使用 React.lazy 动态引入其他组件，确保类型正确
const Home: LazyExoticComponent<React.ComponentType<any>> = React.lazy(
  () => import("../views/home")
);
const Entire: LazyExoticComponent<React.ComponentType<any>> = React.lazy(
  () => import("../views/entire")
);
const Detail: LazyExoticComponent<React.ComponentType<any>> = React.lazy(
  () => import("../views/detail")
);
const Login: LazyExoticComponent<React.ComponentType<any>> = React.lazy(
  () => import("../views/login")
);

const Register: LazyExoticComponent<React.ComponentType<any>> = React.lazy(
  () => import("../views/register")
);
// 定义路由配置项的类型
interface RouteConfig {
  path: string; // 路由路径
  element: React.ReactNode; // 对应的组件，可以是 React.lazy 动态导入的组件
}

// 定义路由配置数组
const routes: RouteConfig[] = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/home",
    element: <Home />, // 这里是组件，不是类型
  },
  {
    path: "/entire",
    element: <Entire />,
  },
  {
    path: "/detail",
    element: <Detail />,
  },
  {
    path: "/demo",
    element: <Demo />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

export default routes;
