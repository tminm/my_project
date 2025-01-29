import React, { ChangeEventHandler, memo, useState } from "react";
import { ExperienceWrapper } from "./style";
import { Modal, Input, Button, List, Divider } from "antd";
import { useSelector } from "react-redux";
import { generateRandomColor } from "utils";

const Experience = memo(() => {
  let { userInfo } = useSelector((state: any) => ({
    userInfo: state.home.userInfo,
  }));

  if (!userInfo.id && userInfo.username !== "") {
    userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  }
  const [likes, setLikes] = useState<number[]>([0, 0, 0]); // 存储每个卡片的点赞数
  const [isModalVisible, setIsModalVisible] = useState(false); // 控制弹窗显隐
  const [selectedAttraction, setSelectedAttraction] = useState<any>(null); // 当前选中的景点信息
  const [comment, setComment] = useState(""); // 评论内容
  const [comments, setComments] = useState<string[]>([]); // 评论列表
  const handleLike = (index: number) => {
    const newLikes = [...likes];
    newLikes[index] += 1;
    setLikes(newLikes);
  };

  const handleComment = (index: number) => {
    const newComments = [...comments];
    newComments[index] += 1;
    setComments(newComments);
  };

  // 打开弹窗并设置当前选中的景点
  const showModal = (attraction: any) => {
    setSelectedAttraction(attraction);
    setIsModalVisible(true);
  };

  // 关闭弹窗
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedAttraction(null); // 清除当前选中的景点
  };

  // 提交评论
  const handleSubmitComment = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment(""); // 清空评论输入框
    }
  };

  const cardData = [
    {
      id: 1,
      title: "长城",
      description: "古老的长城是中国的象征，适合历史爱好者，体验传统文化。",
      imageUrl: "http://localhost:4000/greatwall.png",
    },
    {
      id: 2,
      title: "故宫博物院",
      description: "世界上最大的宫殿，具有悠久的历史，文化底蕴深厚。",
      imageUrl: "http://localhost:4000/R.jpg",
    },
    {
      id: 3,
      title: "张家界",
      description: "奇特的山脉风光，拥有丰富的自然景观，是摄影爱好者的天堂。",
      imageUrl: "http://localhost:4000/jie.png",
    },
    {
      id: 4,
      title: "西湖",
      description: "风景如画的湖泊，是情侣和家庭游玩的理想场所。",
      imageUrl: "http://localhost:4000/71eaff66299d9d788f2285e62ba0d84e.jpg",
    },
    {
      id: 5,
      title: "黄山",
      description: "以奇松、怪石、云海和温泉著称，是登山探险者的理想去处。",
      imageUrl: "http://localhost:4000/OIP.jpg",
    },
    {
      id: 6,
      title: "丽江古城",
      description: "拥有古老的文化和美丽的街道，是体验宁静与历史的好地方。",
      imageUrl: "http://localhost:4000/OIP2.jpg",
    },
    {
      id: 7,
      title: "九寨沟",
      description: "被誉为人间仙境，拥有世界上最美的湖泊和瀑布。",
      imageUrl: "http://localhost:4000/JIU.jpg",
    },
    {
      id: 8,
      title: "峨眉山",
      description: "是佛教圣地之一，享有‘万山之宗’的美誉，适合心灵净化。",
      imageUrl: "http://localhost:4000/mei.jpg",
    },
    {
      id: 9,
      title: "上海迪士尼乐园",
      description: "适合家庭游玩的乐园，拥有众多娱乐项目和丰富的童话世界。",
      imageUrl: "http://localhost:4000/di.jpg",
    },
    {
      id: 10,
      title: "哈尔滨冰雪大世界",
      description: "冬季的冰雪奇观，适合体验冰雕艺术和雪地活动。",
      imageUrl: "http://localhost:4000/ha.jpg",
    },
  ];

  return (
    <ExperienceWrapper>
      <div className="experience-container">
        <h1>互动专区</h1>
        <div className="card-list">
          {cardData.map((item, index) => (
            <div
              key={index}
              className="card"
              onClick={() => {
                setIsModalVisible(true);
                console.log(item);
                setSelectedAttraction(item);
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="card-image"
              />
              <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="card-actions">
                  <button
                    className="like-btn"
                    onClick={() => handleLike(index)}
                  >
                    👍 {likes[index]} 赞
                  </button>
                  <button
                    className="comment-btn"
                    onClick={() => handleComment(index)}
                  >
                    💬 {comments[index]} 评论
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 弹窗部分 */}
        <Modal
          title={selectedAttraction?.name}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={684}
        >
          <div>
            <img
              src={selectedAttraction?.imageUrl}
              alt={selectedAttraction?.name}
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                marginBottom: "20px",
                marginTop: "32px",
              }}
            />
            <h2>景点介绍</h2>
            <p style={{ fontSize: "16px" }}>
              这里是关于{selectedAttraction?.description}
            </p>

            <h2>评论区</h2>
            <Input.TextArea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="在这里输入评论..."
              style={{ marginBottom: "10px" }}
            />
            <button
              onClick={handleSubmitComment}
              disabled={!comment.trim()}
              style={{
                marginBottom: "20px",
                marginLeft: "520px",
                marginTop: "10px",
                border: "none",
                backgroundColor: "#1890ff",
                color: "#fff",
                width: "100px",
                height: "40px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              发布评论
            </button>

            {/* 评论展示 */}
            <List
              itemLayout="horizontal"
              dataSource={comments}
              renderItem={(comment, index) => (
                <div
                  style={{
                    border: "1px solid #ccc",
                    marginBottom: "10px",
                    padding: "20px",
                    borderRadius: "20px",
                    boxSizing: "border-box",
                  }}
                >
                  {/* 用户名称和动态颜色名称首字母头像 */}
                  <div
                    className="commentTop"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "50%",
                        backgroundColor: generateRandomColor(),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "20px",
                      }}
                    >
                      {userInfo.username.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ marginLeft: "13px" }}>
                      <h4>{userInfo.username}</h4>
                    </div>
                    <div style={{ marginLeft: "375px", color: "#ccc" }}>
                      <h4>1分钟前.发表于广东</h4>
                    </div>
                  </div>
                  <h4>{comment}</h4>
                </div>
              )}
            />
          </div>
        </Modal>
      </div>
    </ExperienceWrapper>
  );
});

export default Experience;
