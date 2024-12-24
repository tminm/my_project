import React, { memo } from "react";
import { EPaginationWrapper } from "./style";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCurrentPageAction,
  fetchRoomListAction,
} from "../../../store/modules/entire/createActions";

import { RootState } from "store/types";

const EntirePagination = memo(() => {
  // 从 Redux 状态中获取总数和当前页
  const { totalCount, currentPage } = useSelector((state: RootState) => ({
    totalCount: state.entire.totalCount,
    currentPage: state.entire.currentPage,
  }));

  // 获取派发器
  const dispatch = useDispatch();

  // 事件处理函数：分页更改时
  const pageChangeHandle = (page: number) => {
    dispatch(changeCurrentPageAction(page - 1) as any);
    dispatch(fetchRoomListAction() as any);
    // 回到页面顶部
    window.scrollTo(0, 0);
  };

  return (
    <EPaginationWrapper>
      <Pagination
        current={currentPage + 1} // 因为 Pagination 的 onChange 需要 1 开始的索引
        defaultPageSize={20}
        total={totalCount}
        onChange={pageChangeHandle}
      />
    </EPaginationWrapper>
  );
});

export default EntirePagination;
