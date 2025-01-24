import httpInstance from "services/request";

export function postUserInfo() {
  return httpInstance.post({
    url: "/login",
  });
}

export function getLoginInfo(username: string, password: string) {
  return httpInstance.post({
    url: "/login",
    data: {
      username,
      password,
    },
  });
}
