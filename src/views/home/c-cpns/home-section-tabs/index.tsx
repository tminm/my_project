import React, { memo, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { SectionTabsWrapper } from "./style";
import SectionHeader from "../../../../components/section-header";
import SectionTabs from "../../../../components/section-tabs";
import SectionRooms from "../../../../components/section-rooms";
import SectionFooter from "../../../../components/section-footer";

interface IProps {
  infoData: {
    title: string;
    subtitle: string;
    dest_address?: { name: string }[];
    dest_list: { [key: string]: any[] }; // 确保 dest_list 中的结构类型明确
  };
}

const HomeSectionTabs: React.FC<IProps> = memo(function HomeSectionTabs(props) {
  // 从 props 获取数据
  const { infoData } = props;
  // 定义内部的 state
  const initialName = Object.keys(infoData.dest_list)[0];
  // useState 的初始化值只在第一次渲染的时候有用
  const [name, setName] = useState(initialName);
  const tabNames = infoData.dest_address?.map((item: any) => item.name);

  // 事件处理函数
  const tabClickHandle = useCallback(function (index: number, name: string) {
    setName(name);
  }, []);

  return (
    <SectionTabsWrapper>
      <SectionHeader
        title={infoData.title}
        subtitle={infoData.subtitle}
      ></SectionHeader>
      <SectionTabs tabNames={tabNames} tabClick={tabClickHandle}></SectionTabs>
      <SectionRooms
        roomList={infoData.dest_list?.[name]}
        itemwidth="33.333%"
      ></SectionRooms>
      <SectionFooter name={name}></SectionFooter>
    </SectionTabsWrapper>
  );
});

HomeSectionTabs.propTypes = {
  infoData: PropTypes.object.isRequired, // 这里使用 isRequired 确保传递 infoData 参数
};

export default HomeSectionTabs;
