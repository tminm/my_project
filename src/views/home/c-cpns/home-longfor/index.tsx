import React, { memo } from "react";
import PropTypes from "prop-types";
import { LongForWrapper } from "./style";
import SectionHeader from "../../../../components/section-header";
import LongForItem from "../../../../components/longfor-item";
import ScrollView from "../../../../base-ui/scroll-view";

interface LongForItemData {
  city: string;
  // 其他字段根据实际数据结构添加
}

interface IProps {
  infoData: {
    title: string;
    subtitle: string;
    list: LongForItemData[];
  };
}

const HomeLongfor: React.FC<IProps> = memo(function HomeLongfor(props) {
  const { infoData } = props;
  return (
    <LongForWrapper>
      <SectionHeader
        title={infoData.title}
        subtitle={infoData.subtitle}
      ></SectionHeader>
      <div className="longfor-list">
        <ScrollView>
          {infoData.list.map((item: LongForItemData) => {
            return <LongForItem itemData={item} key={item.city}></LongForItem>;
          })}
        </ScrollView>
      </div>
    </LongForWrapper>
  );
});

HomeLongfor.propTypes = {
  infoData: PropTypes.object.isRequired,
};

export default HomeLongfor;
