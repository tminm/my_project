import styled from "styled-components";

export const RoomWrapper = styled.div`
  .room {
    width: 100%;
    height: 968px;
    margin-top: 20px;

    .container {
      margin: 0 auto;
      background-color: #fff;
      height: 100%;
      width: 1026px;
      border-radius: 18px;
      padding: 30px;
      box-shadow: 0 0 10px #ccc;
    }

    .uploadImage {
      border: 1px solid #ccc;
      border-radius: 20px;
    }

    .button {
      margin-top: 20px;
      button {
        width: 100%;
        height: 48px;
        background-color: #e51d58;
        border: none;
        color: #fff;
        border-radius: 20px;
      }
    }
  }
`;
