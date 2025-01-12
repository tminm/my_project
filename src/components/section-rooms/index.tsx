import React, { memo, use, useCallback } from "react";
import PropTypes from "prop-types";
import RoomItem from "../room-item";
import { RoomWrapper } from "./style";
import { changeDetailInfoAction } from "store/modules/detail";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface IProps {
  roomList: any[];
  itemwidth?: string;
}
const SectionRooms: React.FC<IProps> = memo(function SectionRooms(props) {
  const { roomList, itemwidth } = props;
  const disPatch = useDispatch();
  const navigate = useNavigate();
  const itemClickHandle = useCallback(
    (item: any) => {
      disPatch(changeDetailInfoAction(item));
      navigate("/detail");
    },
    [navigate, disPatch]
  );
  return (
    <RoomWrapper className="room-list">
      {roomList?.slice(0, 8).map((item) => {
        console.log(item);
        return (
          <RoomItem
            itemData={item}
            itemwidth={itemwidth}
            key={item.id}
            itemClick={itemClickHandle}
          ></RoomItem>
        );
      })}
    </RoomWrapper>
  );
});

export default SectionRooms;
