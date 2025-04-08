import styled from "styled-components";

export const UserCenterWrapper = styled.div`
  .content {
    padding-left: 428px;
    padding-bottom: 200px;
    background-color: #fff;
    /* display: flex; */

    .top {
      display: flex;
    }

    .left {
      padding-top: 20px;
    }

    .right {
      padding-top: 20px;
      margin-left: 50px;
    }
    .bottom {
      padding-top: 20px;
    }

    .userInfo {
      width: 382px;
      height: 290px;
      border-radius: 30px;
      box-shadow: 0 0 10px #ccc;
      padding: 30px;
    }

    .phone {
      width: 382px;
      height: 290px;
      border-radius: 30px;
      box-shadow: 0 0 10px #ccc;
      padding: 30px;
    }

    .order {
      display: flex;
      width: 878px;
      height: 132px;
      border-radius: 30px;
      box-shadow: 0 0 10px #ccc;
      padding: 30px;
      margin-top: 20px;
      span {
        margin-left: 20px;
      }
    }

    .btn {
      width: 92px;
      height: 42px;
      cursor: pointer;
    }

    .mybutton {
      width: 93px;
      height: 39px;
      border: none;
      background: #1890ff;
      color: #fff;
      margin-top: 20px;
      margin-left: 270px;
      border-radius: 5px;
      cursor: pointer;
    }

    .marTop {
      margin-top: 8px;
    }
  }
`;
