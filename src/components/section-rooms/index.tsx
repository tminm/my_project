import React, { memo } from "react";
import PropTypes from "prop-types";
import RoomItem from "../room-item";
import { RoomWrapper } from "./style";

interface IProps {
  roomList: any[];
  itemwidth?: string;
}
const SectionRooms: React.FC<IProps> = memo(function SectionRooms(props) {
  const { roomList, itemwidth } = props;
  return (
    <RoomWrapper className="room-list">
      {roomList?.slice(0, 8).map((item) => {
        return (
          <RoomItem
            itemData={item}
            itemwidth={itemwidth}
            key={item.id}
          ></RoomItem>
        );
      })}
    </RoomWrapper>
  );
});

export default SectionRooms;
