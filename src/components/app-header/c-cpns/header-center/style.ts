import styled from "styled-components";

const CenterWrapper = styled.div`
  .search-bar {
    display: flex;
    height: 48px;
    width: 300px;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid #ddd;
    border-radius: 25px;
    padding: 0 8px;
    cursor: pointer;

    ${(props) => props.theme.minxs.boxShodow}

    .text {
      padding: 0 16px;
      color: #222;
      font-weight: 600;
    }

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      color: #fff;

      background-color: ${(props) => props.theme.color.primaryColor};
    }
  }

  .search-detail {
    position: relative;
    transform-origin: 50% 0;
    will-change: transform, opacity;

    .infos {
      position: absolute;
      top: 60px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .search-detail {
    position: relative;
    transform-origin: 50% 0;
    will-change: transform, opacity;
    /* transition: all 250ms linear; */

    .infos {
      position: absolute;
      top: 60px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .detail-exit {
    transform: scale(1) translateY(0);
    opacity: 1;
  }

  .detail-exit-active {
    transition: all 250ms ease;
    transform: scale(0.35, 0.727273) translateY(-58px);
    opacity: 0;
  }

  .detail-enter {
    transform: scale(0.35, 0.727273) translateY(-58px);
    opacity: 0;
  }

  .detail-enter-active {
    transform: scale(1) translateY(0);
    opacity: 1;
    transition: all 250ms ease;
  }

  .bar-enter {
    transform: scale(2.85714, 1.375) translateY(58px);
    opacity: 0;
  }

  .bar-enter-active {
    transition: all 250ms ease;
    transform: scale(1) translateY(0);
    opacity: 1;
  }

  .bar-exit {
    opacity: 0;
  }
`;

export default CenterWrapper;
