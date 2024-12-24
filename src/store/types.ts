// store/types.ts 或者在 store 相关文件中定义
export interface RootState {
  entire: {
    totalCount: number;
    currentPage: number;
    roomList: any[]; // 你可以根据实际数据类型修改
    isLoading: boolean;
  };
  // 其他 slice 状态
}
