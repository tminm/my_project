// src/services/aiService.ts
import axios from "axios";

type ErnieResponse = {
  data: string;
  is_safe: boolean;
};

export const askErnie = async (question: string): Promise<string> => {
  try {
    const response = await axios.post<ErnieResponse>(
      "http://localhost:4000/chat", // 后端代理地址
      { content: question },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data.data;
  } catch (error) {
    console.error("AI服务异常:", error);
    return "服务暂时不可用，请稍后再试";
  }
};
