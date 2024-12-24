import styled from "styled-components";

export const ERoomsWrapper = styled.div`
  position: relative;
  padding: 30px 20px;

  .title {
    font-size: 22px;
    color: #222;
    margin: 0 0 10px 10px;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
  }

  > .cover {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.8);
  }
`;
