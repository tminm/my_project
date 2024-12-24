import styled from "styled-components";

export const RightWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  font-size: 14px;

  .btns {
    display: flex;
    align-items: center;
    color: ${(props) => (props.theme.isAlpha ? "#fff" : "#484848")};

    .btn {
      height: 18px;
      line-height: 18px;
      padding: 12px 12px;
      border-radius: 20px;
      cursor: pointer;
      &:hover {
        background-color: ${(props) =>
          props.theme.isAlpha ? "rgba(255,255,255,.1)" : "#f5f5f5"};
      }
    }
  }

  .profile {
    height: 42px;
    width: 77px;
    margin-left: 10px;
    margin-right: 20px;
    justify-content: space-around;
    display: flex;
    align-items: center;
    border: 1px solid #dddddd;
    border-radius: 25px;
    background-color: #fff;

    //阴影动画
    //方法一：
    /* transition: box-shadow 250ms ease;
    &:hover {
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.18);
    } */

    //方法二：
    ${(props) => props.theme.minxs.boxShodow}

    .panel {
      position: absolute;
      top: 70px;
      right: 0;
      width: 240px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 0 2px 4px rgba(0, 0, 0, 0.2);
      margin-right: 15px;

      .top {
        border-bottom: 1px solid #dddddd;
      }

      .top,
      .bottom {
        padding: 10px 0;

        .item {
          height: 40px;
          line-height: 40px;
          padding: 0 16px;

          &:hover {
            background-color: ${(props) =>
              props.theme.isAlpha ? "#fff" : "rgba(255,255,255,.1)"};
          }
        }
      }
    }
  }
`;
