import httpInstance from "services/request";

export function uploadFile(data: any) {
  return httpInstance.post({
    url: "/upload",
    data,
  });
}

export function insertRoom(data: any) {
  return httpInstance.post({
    url: "/home/room",
    data,
  });
}

export function getRoomInfo(host_id: number) {
  return httpInstance.post({
    url: "/home/roomInfo",
    data: {
      host_id,
    },
  });
}
