import styled from "styled-components";

export const AIChatWrapper = styled.div`
  .chat-container {
    width: 666px;
    height: 517px; /* 保持固定高度 */
    /* background-color: #fff; */
    border-radius: 18px;
    /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); */
    margin: 10px auto 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
  }

  .response-area {
    flex: 1; /* 占据剩余空间 */
    overflow-y: auto; /* 独立滚动 */
    min-height: 100px; /* 最小高度保障 */
    max-height: calc(100% - 200px); /* 动态计算最大高度 */
    height: 536px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 10px;
    overflow-y: auto; /* 自动滚动 */
    line-height: 1.6;
    white-space: pre-wrap; /* 保留换行 */
    position: relative;
  }

  /* 防止全局滚动 */
  body {
    overflow: hidden;
  }

  .title {
    width: 200px;
    height: 47px;
    margin: 0 0 0 216px;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    vertical-align: middle;
  }

  .submit-button {
    margin-top: auto; /* 按钮始终在底部 */
    border: none;
    background-color: #1890ff;
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    align-self: flex-end; /* 右侧对齐 */
    transition: opacity 0.2s;
    margin-top: 20px;
    margin-right: 20px;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
      opacity: 0.7;
    }
  }
`;
