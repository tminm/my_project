import { getEntireRoomList } from "../../../services/modules/entire";
import * as actionTypes from "./constants";
import { Dispatch } from "redux";
// import { RootState } from ""; // Assuming you have a store where you define the RootState

// Defining action types as constants to avoid typo errors
export const CHANGE_CURRENT_PAGE = "CHANGE_CURRENT_PAGE";
export const CHANGE_ROOM_LIST = "CHANGE_ROOM_LIST";
export const CHANGE_TOTAL_COUNT = "CHANGE_TOTAL_COUNT";
export const CHANGE_IS_LOADING = "CHANGE_IS_LOADING";

// Action Types
interface ChangeCurrentPageAction {
  type: typeof actionTypes.CHANGE_CURRENT_PAGE;
  currentPage: number;
}

interface ChangeRoomListAction {
  type: typeof actionTypes.CHANGE_ROOM_LIST;
  roomList: any[]; // You can refine this with a more specific type for room list
}

interface ChangeTotalCountAction {
  type: typeof actionTypes.CHANGE_TOTAL_COUNT;
  totalCount: number;
}

interface ChangeIsLoadingAction {
  type: typeof actionTypes.CHANGE_IS_LOADING;
  isLoading: boolean;
}

interface responseData {
  list: any[];
  totalCount: number;
}

// Combine all action types into a single type
export type EntireActionTypes =
  | ChangeCurrentPageAction
  | ChangeRoomListAction
  | ChangeTotalCountAction
  | ChangeIsLoadingAction;

// Action creators

export const changeCurrentPageAction = (
  currentPage: number
): ChangeCurrentPageAction => {
  return {
    type: actionTypes.CHANGE_CURRENT_PAGE,
    currentPage,
  };
};

export const changeRoomListAction = (
  roomList: any[]
): ChangeRoomListAction => ({
  type: actionTypes.CHANGE_ROOM_LIST,
  roomList,
});

export const changeTotalCountAction = (
  totalCount: number
): ChangeTotalCountAction => ({
  type: actionTypes.CHANGE_TOTAL_COUNT,
  totalCount,
});

export const changeIsLoadingAction = (
  isLoading: boolean
): ChangeIsLoadingAction => ({
  type: actionTypes.CHANGE_IS_LOADING,
  isLoading,
});

export const changeLoginInfoAction = () => ({
  type: actionTypes.CHANGE_LOGIN_INFO,
  userInfo: {
    userName: "陈",
    passWord: "123456",
  },
});

// Fetch room list action creator using redux-thunk
export const fetchRoomListAction = () => {
  return async (dispatch: Dispatch<EntireActionTypes>, getState: () => any) => {
    // 1. Get the current page from the state
    const currentPage = getState().entire.currentPage;

    // Dispatch loading action
    dispatch(changeIsLoadingAction(true));

    // Fetch the room list
    const res = (await getEntireRoomList()) as any;

    // Dispatch loading action false after fetching data
    dispatch(changeIsLoadingAction(false));

    // 2. Save the room list and total count in the Redux state
    const roomList = res.data;
    const totalCount = res.data.length;

    dispatch(changeRoomListAction(roomList));
    dispatch(changeTotalCountAction(totalCount));
  };
};

export const fetchLoginAction = () => {
  return async (dispatch: Dispatch<EntireActionTypes>) => {
    dispatch(changeIsLoadingAction(true));
  };
};
