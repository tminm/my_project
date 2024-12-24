import styled from "styled-components";

export const FooterWrapper = styled.div`
  display: flex;
  margin-top: 10px;

  .info {
    display: flex;
    cursor: pointer;
    align-items: center;

    font-weight: 700;
    color: ${(props) => props.color};
    font-size: 17px;

    &:hover {
      text-decoration: underline;
    }

    .text {
      margin-right: 6px;
    }
  }
`;
