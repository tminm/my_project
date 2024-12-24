import PropTypes from "prop-types";
import React, { memo, useEffect, useState } from "react";
import { BrowserWrapper } from "./style";
import IconClose from "../../assets/svg/icon-close";
import IconArrowLeft from "../../assets/svg/icon-arrow-left";
import IconArrowRight from "../../assets/svg/icon-arrow-right";

import { CSSTransition, SwitchTransition } from "react-transition-group";

interface IProps {
  pictureUrls: string[];
  closeclick?: (e: any) => void;
}

const PictureBrowser: React.FC<IProps> = memo((props) => {
  const { pictureUrls, closeclick } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isNext, setIsNext] = useState(true);
  //当图片显示出来的时候，滚动功能消失
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  function closeBtnClickHandle(e: any) {
    if (closeclick) closeclick(e);
  }

  function controlClickHandle(isNext = true) {
    let newIndex = isNext ? currentIndex + 1 : currentIndex - 1;
    if (newIndex < 0) newIndex = pictureUrls.length - 1;
    if (newIndex > pictureUrls.length - 1) newIndex = 0;

    setCurrentIndex(newIndex);
    setIsNext(isNext);
  }
  return (
    <BrowserWrapper isNext={isNext}>
      <div className="top">
        <div className="close-btn" onClick={closeBtnClickHandle}>
          <IconClose></IconClose>
        </div>
      </div>
      <div className="slider">
        <div className="control">
          <div className="btn left" onClick={(e) => controlClickHandle(false)}>
            <IconArrowLeft width="77" height="77"></IconArrowLeft>
          </div>
          <div className="btn right" onClick={(e) => controlClickHandle(true)}>
            <IconArrowRight width="77" height="77"></IconArrowRight>
          </div>
        </div>
        <div className="picture">
          <SwitchTransition mode="in-out">
            <CSSTransition
              key={pictureUrls[currentIndex]}
              classNames="pic"
              timeout={200}
            >
              <img src={pictureUrls[currentIndex]} alt="" />
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>

      <div className="preview"></div>
    </BrowserWrapper>
  );
});

PictureBrowser.propTypes = {
  pictureUrls: PropTypes.array,
};

export default PictureBrowser;
