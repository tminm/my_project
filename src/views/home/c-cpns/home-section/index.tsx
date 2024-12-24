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
        title={infoData.title}
        subtitle={infoData.subtitle}
      ></SectionHeader>
      <SectionRooms roomList={infoData.list} itemwidth="25%"></SectionRooms>
      <SectionFooter></SectionFooter>
    </SectionWarpper>
  );
});

export default HomeSection;
