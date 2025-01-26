import httpInstance from "services/request";

interface postInfo {
  username: string;
  password: string;
  hole: string;
}

export function postUserInfo(username: string, password: string, role: string) {
  return httpInstance.post({
    url: "/register",
    data: {
      username,
      password,
      role,
    },
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
