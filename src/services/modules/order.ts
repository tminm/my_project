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
