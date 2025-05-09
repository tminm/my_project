import httpInstance from "../request";

interface OrderInfo {
  userId: number;
  roomName: string;
  picture: string;
  price: number;
  status: string;
}

export function postOrder(orderInfo: OrderInfo) {
  return httpInstance.post({
    url: "/order",
    data: orderInfo,
  });
}

export function getOrder(userId: number) {
  return httpInstance.post({
    url: "/order/info",
    data: {
      userId,
    },
  });
}

export function cancelOrder(orderId: number) {
  return httpInstance.post({
    url: "/order/cancel",
    data: {
      orderId,
    },
  });
}

export function deleteRoom(orderId: number) {
  return httpInstance.post({
    url: "/home/deleteRoom",
    data: {
      orderId,
    },
  });
}
