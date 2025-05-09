import styled from "styled-components";

export const LeftWrapper = styled.div`
  flex: 1;
  display: flex;
  /* color: var(--parimary-color); */
  color: ${(props) =>
    props.theme.isAlpha ? "#fff" : props.theme.color.primaryColor};

  .logo {
    cursor: pointer;
    margin-left: 30px;
  }
`;
