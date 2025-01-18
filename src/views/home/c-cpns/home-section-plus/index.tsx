import SectionHeader from "../../../../components/section-header";
import PropTypes from "prop-types";
import React, { memo } from "react";
import { HomePlusWrapper } from "./style";
import RoomItem from "../../../../components/room-item";
import ScrollView from "../../../../base-ui/scroll-view";
import SectionFooter from "../../../../components/section-footer";

// 定义 infoData 类型
interface RoomItemData {
  id: string | number; // 假设每个房间项有 id
  // 可以根据需要添加其他字段，比如 name, price, 等
  name: string;
  price: number;
  picture_urls?: string[];
}

interface InfoData {
  title: string;
  subtitle: string;
  list: RoomItemData[];
}

interface HomeSectionPlusProps {
  infoData: {
    data: InfoData[];
  };
}

const HomeSectionPlus: React.FC<HomeSectionPlusProps> = memo((props) => {
  const { infoData } = props;
  return (
    <HomePlusWrapper>
      <SectionHeader
        title={infoData.data[0].title}
        subtitle={infoData.data[0].subtitle}
      ></SectionHeader>
      <div className="room-list">
        <ScrollView>
          {infoData.data[0].list.map((item) => {
            return (
              <RoomItem
                itemData={item}
                itemwidth="20%"
                key={item.id}
              ></RoomItem>
            );
          })}
        </ScrollView>
      </div>
      <SectionFooter name="Plus"></SectionFooter>
    </HomePlusWrapper>
  );
});

// 使用 PropTypes 进行额外的检查
HomeSectionPlus.propTypes = {
  infoData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        picture_urls: PropTypes.arrayOf(PropTypes.string),
      })
    ).isRequired,
  }).isRequired,
};

export default HomeSectionPlus;
