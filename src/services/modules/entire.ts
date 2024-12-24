import httpInstance from "../request";

export function getEntireRoomList(offset = 0, size = 20) {
  return httpInstance.get({
    url: "entire/list",
    params: {
      offset,
      size,
    },
  });
}
