import { useState, useEffect, useRef, useCallback } from "react";
import { askErnie } from "../../services/modules/aiService";
import { AIChatWrapper } from "./style";
import TextArea from "antd/es/input/TextArea";
import { Flex, Spin } from "antd"; // 增加加载状态组件
import { AliwangwangOutlined } from "@ant-design/icons";

const ChatWidget = () => {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [displayedReply, setDisplayedReply] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const responseAreaRef = useRef<HTMLDivElement>(null); // 回复区域的ref

  // 滚动到底部的回调函数
  const scrollToBottom = useCallback(() => {
    if (responseAreaRef.current) {
      responseAreaRef.current.scrollTop = responseAreaRef.current.scrollHeight;
    }
  }, []);

  // 打字机效果
  useEffect(() => {
    if (!reply) return;
    const timer = setInterval(() => {
      if (typingIndex < reply.length) {
        setDisplayedReply((prev) => prev + reply[typingIndex]);
        setTypingIndex((prev) => prev + 1);

        // 每次更新时检查是否接近底部，若是则滚动
        const { scrollTop, scrollHeight, clientHeight } =
          responseAreaRef.current!;
        if (scrollHeight - (scrollTop + clientHeight) < 20) {
          scrollToBottom();
        }
      } else {
        clearInterval(timer);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [reply, typingIndex, scrollToBottom]);

  // 内容变化时自动滚动到底部
  useEffect(() => {
    scrollToBottom();
  }, [displayedReply]);

  const handleSubmit = async () => {
    if (!message.trim()) return;

    try {
      setMessage(""); // 清空输入框
      setIsLoading(true);
      const aiResponse = await askErnie(message);
      setReply(aiResponse);
      setDisplayedReply(""); // 清空当前显示的回复
      setTypingIndex(0); // 重置打字机效果的索引
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AIChatWrapper>
      <div className="chat-container">
        <div className="title">
          <span style={{ marginRight: "8px", fontSize: "20px" }}>
            <AliwangwangOutlined style={{ fontSize: "28px" }} />
          </span>
          AI智能问答
        </div>
        <div className="response-area" ref={responseAreaRef}>
          {displayedReply}
          {isLoading && (
            <Spin size="default" style={{ marginLeft: 8 }} tip="思考中" />
          )}
        </div>
        <Flex vertical gap={32} style={{ marginTop: "20px" }}>
          <TextArea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="请输入你的问题"
            style={{ height: 159, resize: "none", width: 666 }}
            disabled={isLoading}
            onPressEnter={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          />
        </Flex>

        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "生成中..." : "确认"}
        </button>
      </div>
    </AIChatWrapper>
  );
};

export default ChatWidget;
