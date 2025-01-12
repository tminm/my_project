import styled from "styled-components";

export const InfosWrapper = styled.div`
  .infos {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .roomInfo {
      width: 50%;
      padding-left: 157px;
      margin-top: -109px;

      .score {
        padding-left: 2px;
        display: flex;
        align-items: center;
        a {
          color: #333;
        }
      }
    }

    .booking {
      width: 50%;
      padding-right: 157px;
      /* display: flex; */
      /* justify-content: center; */
      .booking-wrapper {
        border: 1px solid #ccc;
        padding: 30px;
        border-radius: 30px;
        margin-top: 55px;
        width: 355px;
        margin-left: 179px;
      }
    }
    //分割线
    &::after {
      content: "";
      display: block;
      width: 1px;
      height: 100px;
      position: absolute;
      left: 50%;
      top: 0;
      background-color: #ccc;
    }
  }
`;
