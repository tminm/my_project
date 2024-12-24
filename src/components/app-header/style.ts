import styled from "styled-components";

interface SearchAreaProps {
  isSearch: boolean;
}

export const HeaderWrapper = styled.div`
  &.fixed {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    right: 0;
  }

  .content {
    position: relative;
    z-index: 19;
    border-bottom: 1px solid #eee;
    transition: all 250ms ease;
    border-bottom-color: ${(props) =>
      props.theme.isAlpha ? "rgba(233,233,233,0)" : "rgba(233,233,233,1)"};
    background-color: ${(props) =>
      props.theme.isAlpha ? "rgba(255,255,255,0)" : "rgba(255,255,255,1)"};
    .top {
      display: flex;
      align-items: center;
      height: 80px;
    }
  }
  .cover {
    position: fixed;
    top: 179px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

export const SearchAreaWrapper = styled.div<SearchAreaProps>`
  transition: height 250ms ease;
  height: ${(props) => (props.isSearch ? "100px" : "0")};
`;
