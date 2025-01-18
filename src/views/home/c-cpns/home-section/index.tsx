import React, { memo } from "react";
import PropTypes from "prop-types";
import { SectionWarpper } from "./style";
import SectionHeader from "../../../../components/section-header";
import SectionRooms from "../../../../components/section-rooms";
import SectionFooter from "../../../../components/section-footer";

interface IProps {
  infoData: any;
}

const HomeSection: React.FC<IProps> = memo(function HomeSection(props) {
  const { infoData } = props;
  return (
    <SectionWarpper>
      <SectionHeader
        title={infoData.data[0].title}
        subtitle={infoData.data[0].subtitle}
      ></SectionHeader>
      <SectionRooms
        roomList={infoData.data[0].list}
        itemwidth="25%"
      ></SectionRooms>
      <SectionFooter></SectionFooter>
    </SectionWarpper>
  );
});

export default HomeSection;
