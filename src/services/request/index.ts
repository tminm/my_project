import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL, TIMEOUT } from "./config";

// 默认配置
const defaultBaseURL = BASE_URL || "http://default.url";
const defaultTimeout = TIMEOUT || 10000;

class HttpInstance {
  private instance;

  constructor(baseURL = defaultBaseURL, timeout = defaultTimeout) {
    // 创建axios实例
    this.instance = axios.create({
      baseURL,
      timeout,
    });

    // 响应拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        // 明确res的类型为AxiosResponse
        return res.data;
      },
      (err: AxiosError) => {
        // 明确err的类型为AxiosError
        if (err.response) {
          // 请求成功发出，但服务器响应了状态码（非2xx）
          console.error("Response error:", err.response.data);
          return Promise.reject(err.response);
        } else if (err.request) {
          // 请求已发出但没有收到响应
          console.error("Request error:", err.request);
          return Promise.reject(err.request);
        } else {
          // 其他错误
          console.error("Error", err.message);
          return Promise.reject(err.message);
        }
      }
    );
  }

  // 通用请求方法，config 显式指定类型为 AxiosRequestConfig
  request(config: AxiosRequestConfig) {
    return this.instance.request(config);
  }

  // GET请求，config 显式指定类型为 AxiosRequestConfig
  get(config: AxiosRequestConfig) {
    return this.request({ ...config, method: "get" });
  }

  // POST请求，config 显式指定类型为 AxiosRequestConfig
  post(config: AxiosRequestConfig) {
    return this.request({ ...config, method: "post" });
  }
}

// 将实例赋值给一个变量，并导出
const httpInstance = new HttpInstance();
export default httpInstance;
