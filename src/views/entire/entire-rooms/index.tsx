import React, { memo, useCallback } from "react";
import { ERoomsWrapper } from "./style";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import RoomItem from "../../../components/room-item";
import { useNavigate } from "react-router-dom";
import { changeDetailInfoAction } from "../../../store/modules/detail";
import { RootState } from "store/types";

const EntireRooms = memo(() => {
  //从redux中获取roomlist数据
  const { roomList, totalCount, isLoading } = useSelector(
    (state: RootState) => ({
      roomList: state.entire.roomList,
      totalCount: state.entire.totalCount,
      isLoading: state.entire.isLoading,
    }),
    shallowEqual
  );

  //事件处理逻辑
  const navigate = useNavigate();
  const disPatch = useDispatch();
  const itemClickHandle = useCallback(
    (item: any) => {
      disPatch(changeDetailInfoAction(item));
      navigate("/detail");
    },
    [navigate, disPatch]
  );
  return (
    <ERoomsWrapper>
      <h2 className="title">{totalCount}多处住所</h2>
      <div className="list">
        {roomList.map((item) => {
          return (
            <RoomItem
              itemData={item}
              itemwidth="20%"
              key={item._id}
              itemClick={itemClickHandle}
            ></RoomItem>
          );
        })}
      </div>
      {isLoading && <div className="cover"></div>}
    </ERoomsWrapper>
  );
});

export default EntireRooms;
