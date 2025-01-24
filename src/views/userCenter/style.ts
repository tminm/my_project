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
      height: 80px;
      border-radius: 30px;
      box-shadow: 0 0 10px #ccc;
      padding: 30px;
      span {
        margin-left: 20px;
      }
    }
  }
`;
