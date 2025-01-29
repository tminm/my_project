import styled from "styled-components";

export const ExperienceWrapper = styled.div`
  .experience-container {
    font-family: Arial, sans-serif;
    padding: 20px;
    background-color: #fff;
    text-align: center; /* 让整个容器的文本内容水平居中 */
  }

  .card-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    padding: 20px;
    justify-items: center; /* 使每个卡片在网格中水平居中 */
  }

  .card {
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: left; /* 确保卡片内容是左对齐 */
    width: 100%;
    max-width: 350px; /* 控制卡片最大宽度 */
    cursor: pointer;
  }

  .card:hover {
    transform: scale(1.05);
  }

  .card-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .card-content {
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center; /* 使内容在卡片内水平居中 */
    justify-content: center;
  }

  .card-content h3 {
    margin: 10px 0;
    font-size: 1.2em;
  }

  .card-content p {
    font-size: 1em;
    color: #666;
    text-align: center; /* 让描述文本水平居中 */
  }

  .card-actions {
    display: flex;
    justify-content: center; /* 使按钮在卡片底部水平居中 */
    gap: 15px;
    margin-top: 15px;
  }

  .like-btn,
  .comment-btn {
    background-color: #1890ff;
    color: #fff;
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
  }

  .like-btn:hover,
  .comment-btn:hover {
    background-color: #0c79e2;
  }

  .like-btn:focus,
  .comment-btn:focus {
    outline: none;
  }
`;
