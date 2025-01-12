import styled from "styled-components";

export const ConfirmWrapper = styled.div`
  /* 水平垂直居中 */
  .confirm {
    display: flex;
  }

  .tips {
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
    width: 433px;
    height: 89px;
    line-height: 45px;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin-left: 334px;
    padding: 20px;
    box-sizing: border-box;
    font-size: 18px;
  }

  .info {
    margin-top: 30px;
    margin-left: 332px;
  }

  .top {
    margin-top: 10px;
  }

  .img {
    width: 135px;
    height: 123px;
    margin-right: 30px;
    border-radius: 20px;
  }

  .rightcontent {
    margin-top: 66px;
    border: #ccc solid 1px;
    border-radius: 20px;
    width: 32%;
    padding: 30px;
  }

  .room {
    display: flex;
  }

  .price {
    border-top: 1px solid #ccc;
    margin-top: 50px;
  }

  .price-detail {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    margin-top: 20px;
  }
`;
