import React, { ChangeEventHandler, memo, useState } from "react";
import { ExperienceWrapper } from "./style";
import {
  Modal,
  Input,
  Button,
  List,
  Divider,
  UploadProps,
  GetProp,
  UploadFile,
  Image,
  Upload,
} from "antd";
import { useSelector } from "react-redux";
import { generateRandomColor } from "utils";
import { uploadFile } from "services/modules/upload";
import { PlusOutlined } from "@ant-design/icons";

interface PostType {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  comments: string[]; // 新增评论字段
  likes: number; // 新增点赞字段
}

const Experience = memo(() => {
  let { userInfo } = useSelector((state: any) => ({
    userInfo: state.home.userInfo,
  }));

  if (!userInfo.id && userInfo.username !== "") {
    userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  }

  const cardData: PostType[] = [
    {
      id: 1,
      title: "长城",
      description: "古老的长城是中国的象征，适合历史爱好者，体验传统文化。",
      imageUrl: "http://localhost:4000/greatwall.png",
      comments: [],
      likes: 0,
    },
    {
      id: 2,
      title: "故宫博物院",
      description: "世界上最大的宫殿，具有悠久的历史，文化底蕴深厚。",
      imageUrl: "http://localhost:4000/R.jpg",
      comments: [],
      likes: 0,
    },
    {
      id: 3,
      title: "张家界",
      description: "奇特的山脉风光，拥有丰富的自然景观，是摄影爱好者的天堂。",
      imageUrl: "http://localhost:4000/jie.png",
      comments: [],
      likes: 0,
    },
    {
      id: 4,
      title: "西湖",
      description: "风景如画的湖泊，是情侣和家庭游玩的理想场所。",
      imageUrl: "http://localhost:4000/71eaff66299d9d788f2285e62ba0d84e.jpg",
      comments: [],
      likes: 0,
    },
    {
      id: 5,
      title: "黄山",
      description: "以奇松、怪石、云海和温泉著称，是登山探险者的理想去处。",
      imageUrl: "http://localhost:4000/OIP.jpg",
      comments: [],
      likes: 0,
    },
    {
      id: 6,
      title: "丽江古城",
      description: "拥有古老的文化和美丽的街道，是体验宁静与历史的好地方。",
      imageUrl: "http://localhost:4000/OIP2.jpg",
      comments: [],
      likes: 0,
    },
    {
      id: 7,
      title: "九寨沟",
      description: "被誉为人间仙境，拥有世界上最美的湖泊和瀑布。",
      imageUrl: "http://localhost:4000/JIU.jpg",
      comments: [],
      likes: 0,
    },
    {
      id: 8,
      title: "峨眉山",
      description: "是佛教圣地之一，享有‘万山之宗’的美誉，适合心灵净化。",
      imageUrl: "http://localhost:4000/mei.jpg",
      comments: [],
      likes: 0,
    },
    {
      id: 9,
      title: "上海迪士尼乐园",
      description: "适合家庭游玩的乐园，拥有众多娱乐项目和丰富的童话世界。",
      imageUrl: "http://localhost:4000/di.jpg",
      comments: [],
      likes: 0,
    },
    {
      id: 10,
      title: "哈尔滨冰雪大世界",
      description: "冬季的冰雪奇观，适合体验冰雕艺术和雪地活动。",
      imageUrl: "http://localhost:4000/ha.jpg",
      comments: [],
      likes: 0,
    },
  ];

  const [likes, setLikes] = useState<number[]>([0, 0, 0]); // 存储每个卡片的点赞数
  const [isModalVisible, setIsModalVisible] = useState(false); // 控制弹窗显隐
  const [selectedAttraction, setSelectedAttraction] = useState<any>(null); // 当前选中的景点信息
  const [comment, setComment] = useState(""); // 评论内容
  const [comments, setComments] = useState<string[]>([]); // 评论列表
  const [isPostModalVisible, setIsPostModalVisible] = useState(false); // 控制发布帖子弹窗显隐
  const [postTitle, setPostTitle] = useState(""); // 帖子标题
  const [postContent, setPostContent] = useState(""); // 帖子内容
  // 修改初始状态
  const [postList, setPostList] = useState<PostType[]>(cardData);
  const [imgUrl, setImgUrl] = useState<string[]>([]);

  // const [fileList, setFileList] = useState<UploadFile[]>([]); // <-- 父组件的状态
  const handleLike = (index: number) => {
    setPostList((prev) =>
      prev.map((post) =>
        post.id === index ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleComment = (index: number) => {
    return;
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
  // 修改评论提交
  // const handleSubmitComment = () => {
  //   if (comment.trim() && selectedAttraction) {
  //     setPostList((prev) =>
  //       prev.map((post) =>
  //         post.id === selectedAttraction.id
  //           ? { ...post, comments: [...post.comments, comment] }
  //           : post
  //       )
  //     );
  //     setComment("");
  //   }
  // };

  // 修改提交评论函数
  const handleSubmitComment = () => {
    if (comment.trim() && selectedAttraction) {
      setPostList((prev) => {
        const updatedPosts = prev.map((post) =>
          post.id === selectedAttraction.id
            ? { ...post, comments: [...post.comments, comment] }
            : post
        );

        // 更新选中的帖子对象
        const updatedPost = updatedPosts.find(
          (p) => p.id === selectedAttraction.id
        );
        if (updatedPost) {
          setSelectedAttraction(updatedPost);
        }

        return updatedPosts;
      });
      setComment("");
    }
  };

  // 打开发布帖子弹窗
  const showPostModal = () => {
    setIsPostModalVisible(true);
  };

  // 关闭发布帖子弹窗
  const handlePostCancel = () => {
    setIsPostModalVisible(false);
    setPostTitle("");
    setPostContent("");
    setImgUrl([]); // 清空图片 URL
  };

  // 修改提交帖子逻辑
  // 提交帖子时清空状态
  const handleSubmitPost = () => {
    if (postTitle.trim() && postContent.trim()) {
      const newPost = {
        id: Math.random(),
        title: postTitle,
        description: postContent,
        imageUrl: imgUrl[0] || "",
        comments: [],
        likes: 0,
      };
      setPostList((prev) => [...prev, newPost]);
      setImgUrl([]);
      handlePostCancel();
    }
  };

  interface PictureProps {
    onFileUpload: (url: string) => void;
  }
  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  const onFileUpload = (url: string) => {
    imgUrl.push(url);
  };
  const Picture: React.FC<PictureProps> = (props) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([]); // 初始为空数组

    const handlePreview = async (file: UploadFile) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj as FileType);
      }
      setPreviewImage(file.url || (file.preview as string));
      setPreviewOpen(true);
    };

    const handleChange: UploadProps["onChange"] = ({
      fileList: newFileList,
    }) => {
      setFileList(newFileList);
    };

    const handleCustomRequest = async ({ file, onSuccess, onError }: any) => {
      try {
        const formData = new FormData();
        formData.append("file", file); // 将文件添加到 FormData
        const response = await uploadFile(formData);
        const url = (response as any).url;
        if (props.onFileUpload) {
          props.onFileUpload(url);
        }
        // 上传成功
        onSuccess(response, file);
      } catch (error) {
        // 发生错误
        onError(error);
      }
    };

    const uploadButton = (
      <button style={{ border: 0, background: "none" }} type="button">
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </button>
    );

    return (
      <>
        <Upload
          customRequest={handleCustomRequest} // 使用自定义请求
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        {previewImage && (
          <Image
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}
      </>
    );
  };
  return (
    <ExperienceWrapper>
      <div className="experience-container">
        <h1>互动专区</h1>
        <button
          onClick={showPostModal}
          style={{
            marginBottom: "20px",
            width: "98px",
            height: "40px",
            backgroundColor: "#1890ff",
            border: "none",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          发布新帖子
        </button>
        <div className="card-list">
          {postList.map((item, index) => (
            <div
              key={item.id}
              className="card"
              onClick={() => {
                setIsModalVisible(true);
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
                {/* <div className="card-actions">
                  <button
                    className="like-btn"
                    onClick={() => handleLike(index)}
                  >
                    👍 {likes[index]} 赞
                  </button>
                  <button
                    style={{ cursor: "disabled" }}
                    className="comment-btn"
                    onClick={() => handleComment(index)}
                  >
                    💬 {comments[index]} 评论
                  </button>
                </div> */}
                <div className="card-actions">
                  <button
                    className="like-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(item.id);
                    }}
                  >
                    👍 {item.likes} 赞
                  </button>
                  <button className="comment-btn">
                    💬 {item.comments.length} 评论
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 发布帖子弹窗 */}
        <Modal
          style={{ width: "683px" }}
          title="发布新帖子"
          visible={isPostModalVisible}
          onCancel={handlePostCancel}
          footer={null}
        >
          <Input
            placeholder="帖子标题"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            style={{ marginBottom: "10px" }}
          />

          <Input.TextArea
            placeholder="请输入帖子内容"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            rows={4}
            style={{ marginBottom: "20px", height: "200px" }}
          />
          <div
            style={{
              border: "1px solid #ccc",
              marginBottom: "20px",
              padding: "20px",
              borderRadius: "20px",
              boxSizing: "border-box",
            }}
          >
            <h4>请选择图片</h4>
            <Picture onFileUpload={onFileUpload}></Picture>
          </div>
          <button
            onClick={handleSubmitPost}
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              marginLeft: "340px",
              width: "98px",
              height: "40px",
              backgroundColor: "#1890ff",
              border: "none",
              color: "#fff",
              cursor: "pointer",
              borderRadius: "15px",
            }}
          >
            提交帖子
          </button>
        </Modal>

        {/* 弹窗部分 */}
        <Modal
          title={selectedAttraction?.title}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={684}
        >
          <div>
            <img
              src={selectedAttraction?.imageUrl}
              alt={selectedAttraction?.title}
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
              dataSource={(selectedAttraction?.comments as string[]) || []}
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
