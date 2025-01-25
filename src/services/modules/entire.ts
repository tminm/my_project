import httpInstance from "../request";

export function getEntireRoomList() {
  return httpInstance.get({
    url: "/entire",
  });
}
