import React, { memo, useState } from "react";
import { RoomWrapper } from "./style";
import { PlusOutlined } from "@ant-design/icons";
import { DatePicker, Image, Input, Select, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { insertRoom, uploadFile } from "services/modules/upload";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";

interface PictureProps {
  onFileUpload: (url: string) => void;
}

const Room = memo(() => {
  // 城市列表，写出热门城市
  const cityList = [
    "北京",
    "上海",
    "广州",
    "深圳",
    "杭州",
    "成都",
    "重庆",
    "武汉",
  ];
  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

  const nav = useNavigate();

  let { userInfo } = useSelector(
    (state: { home: { goodPriceInfo: any; userInfo: any } }) => ({
      userInfo: state.home.userInfo,
    })
  );

  if (userInfo.id == null) {
    userInfo = JSON.parse(localStorage.getItem("user") || "{}");
  }

  // 表单状态
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState<string[]>([]);
  // const [fileList, setFileList] = useState<UploadFile[]>([]);

  const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  const handleOK = async () => {
    const url = imgUrl[0];
    const res = await insertRoom({
      host_id: userInfo.id,
      name,
      city,
      price,
      startDay: startDate,
      endDay: endDate,
      picture_url: url,
      property_details: description,
    });

    if ((res as any).code === 200) {
      nav("/userCenter");
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDate = (date: moment.Moment | null) => {
    if (date) {
      setStartDate(date?.format("YYYY-MM-DD"));
    }
  };

  const handleDate2 = (date: moment.Moment | null) => {
    if (date) {
      setEndDate(date?.format("YYYY-MM-DD"));
    }
  };

  const handleDes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

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
    <RoomWrapper>
      <div className="room">
        <div className="container">
          <h3>发布房源</h3>
          <div>
            <h4>请选择城市</h4>
            <Select
              style={{ width: 500 }}
              placeholder="选择城市"
              options={cityList.map((city) => ({ value: city, label: city }))}
              onChange={(value) => setCity(value)}
            />
          </div>
          <div>
            <h4>请输入房源名称</h4>
            <Input
              style={{ width: 500 }}
              placeholder="房源名称"
              onChange={handleInput}
            />
          </div>
          <div>
            <h4>请输入房源价格（单位：元/晚）</h4>
            <Input
              style={{ width: 500 }}
              placeholder="房源价格"
              type="number"
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div>
            <h4>出租日期</h4>
            <DatePicker
              style={{ width: 500 }}
              disabledDate={(current) =>
                current && current < moment().startOf("day")
              }
              onChange={handleDate}
            />
          </div>
          <div>
            <h4>截止日期</h4>
            <DatePicker
              style={{ width: 500 }}
              disabledDate={(current) =>
                current && current < moment().startOf("day")
              }
              onChange={handleDate2}
            />
          </div>
          <div>
            <h4>请输入房源描述</h4>
            <TextArea style={{ height: 132 }} onChange={handleDes}></TextArea>
          </div>
          <h4>请上传真实的房源图片</h4>
          <div className="uploadImage">
            <Picture onFileUpload={onFileUpload}></Picture>
          </div>
          <div className="button">
            <button onClick={handleOK}>发布</button>
          </div>
        </div>
      </div>
    </RoomWrapper>
  );
});

export default Room;
