import React, { memo, useEffect, useState } from "react";
import { SectionsWrapper } from "./style";
import { DatePicker, Select, Space } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import { changeSearchInfosAction } from "store/modules/main";
import { useNavigate } from "react-router-dom";

// 假设你有城市数据
const cities = ["北京", "上海", "广州", "深圳", "杭州", "佛山", "南京", "武汉"];

interface SearchInfo {
  title: string;
  desc: string;
}

interface SearchSectionsProps {
  searchInfos: SearchInfo[];
}

const SearchSections: React.FC<SearchSectionsProps> = memo(
  ({ searchInfos }) => {
    const [selectedTab, setSelectedTab] = useState<string | null>(null); // 当前选中的 tab
    const [selectedDate, setSelectedDate] = useState<any>(null); // 存储选择的日期
    const [selectedCity, setSelectedCity] = useState<string | null>(null); // 存储选择的城市
    const [isModalVisible, setIsModalVisible] = useState(false); // 控制模态框显示
    const modalRef = React.useRef<HTMLDivElement>(null);
    const [checkInDate, setCheckInDate] = useState<moment.Moment | null>(null);
    const [checkInDate2, setCheckInDate2] = useState<moment.Moment | null>(
      null
    );
    const dispatch = useDispatch();
    const navigator = useNavigate();

    // useEffect(() => {
    //   window.addEventListener("click", windowHandleClick, true);
    //   return () => {
    //     window.removeEventListener("click", windowHandleClick, true);
    //   };
    // }, []);

    // const windowHandleClick = (e: MouseEvent) => {
    //   if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
    //     setIsModalVisible(false);
    //   }
    // };

    // 展示对应的选择器
    const renderSelector = () => {
      const handleDateChange2 = (date: moment.Moment | null) => {
        setCheckInDate2(date);
        setIsModalVisible(false);
        navigator("/entire");
      };
      switch (selectedTab) {
        case "入住退房日期":
          return (
            <>
              <div style={{ marginLeft: "70px", marginTop: "19px" }}>
                <div>入住时间：</div>
                <DatePicker
                  value={checkInDate}
                  onChange={setCheckInDate}
                  disabledDate={(current) =>
                    current && current < moment().startOf("day")
                  }
                />
                <div style={{ marginTop: "8px" }}>退房时间：</div>
                <DatePicker
                  style={{ marginTop: "10px" }}
                  value={checkInDate2}
                  onChange={handleDateChange2}
                  disabledDate={(current) =>
                    current && current < moment().startOf("day")
                  }
                />
              </div>
            </>
          );
        case "城市":
          return (
            <>
              <Space>
                <Select
                  defaultValue="佛山" // 确保这里的值与 options 中的 value 匹配
                  style={{ width: 180, marginLeft: 50, marginTop: 10 }}
                  onChange={handleCityChange}
                  options={cities.map((city) => ({
                    value: city,
                    label: city,
                  }))}
                />
              </Space>
            </>
          );
        default:
          return null;
      }
    };

    const handleTabClick = (tab: string) => {
      setSelectedTab(tab); // 设置当前选中的 tab
      setIsModalVisible(true); // 显示弹出框
      if (modalRef.current) {
        if (tab === "入住退房日期") {
          modalRef.current.style.marginLeft = "483px";
          modalRef.current.style.height = "200px";
        } else {
          modalRef.current.style.marginLeft = "70px";
          modalRef.current.style.height = "119px";
        }
      }
    };

    const handleCityChange = (value: string) => {
      setSelectedCity(value); // 更新城市选择
      setIsModalVisible(false);
      dispatch(
        changeSearchInfosAction({
          title: value,
        })
      );
    };

    return (
      <>
        <SectionsWrapper>
          {searchInfos.map((item, index) => (
            <div className="item" key={index}>
              <div
                className="info"
                onClick={() => handleTabClick(item.title)} // 点击每个项时弹出模态框
              >
                <div className="title">{item.title}</div>
                <div className="desc">
                  {selectedCity && item.title === "城市"
                    ? selectedCity
                    : item.desc}
                </div>
              </div>
              {index !== searchInfos.length - 1 && (
                <div className="divider"></div>
              )}
            </div>
          ))}
        </SectionsWrapper>

        {/* 模态框 */}
        {isModalVisible && (
          <div
            ref={modalRef}
            className="modal-overlay"
            style={{
              backgroundColor: "#fff",
              borderRadius: "20px",
              width: "290px",
              height: "119px",
              marginLeft: "70px",
              marginTop: "8px",
            }}
          >
            <div className="modal">
              <div
                style={{
                  paddingTop: "20px",
                  paddingLeft: "29px",
                  fontWeight: "bold",
                }}
              >
                {selectedTab}
              </div>

              {/* 渲染不同的选择器 */}
              {renderSelector()}
            </div>
          </div>
        )}
      </>
    );
  }
);

export default SearchSections;
