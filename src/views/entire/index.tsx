import React, { memo, useEffect } from "react";
import { EntireWrapper } from "./style";
import EntireFilter from "./entire-filter";
import EntirePagination from "./entire-pagination";
import EntireRooms from "./entire-rooms";
import { useDispatch } from "react-redux";
import { fetchRoomListAction } from "../../store/modules/entire/createActions";
import { changeHeaderConfigAction } from "../../store/modules/main";
import { Dispatch } from "redux";
// import { RootState } from "../../store"; // 假设你已经定义了根状态

const Entire = memo(() => {
  // 获取 dispatch，并为 dispatch 提供正确的类型
  const dispatch: Dispatch = useDispatch();

  useEffect(() => {
    // 发送动作，确保使用正确的类型
    dispatch(fetchRoomListAction() as any);
    dispatch(changeHeaderConfigAction({ isFixed: true, topAlpha: false }));
  }, [dispatch]);

  return (
    <EntireWrapper>
      <EntireFilter />
      <EntireRooms />
      <EntirePagination />
    </EntireWrapper>
  );
});

export default Entire;
