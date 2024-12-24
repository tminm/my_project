import React, { memo } from "react";
import PropTypes from "prop-types";
import { FooterWrapper } from "./style";
import IconMoreArrow from "../../assets/svg/icon-more-arrow";
import { useNavigate } from "react-router-dom";

interface IProps {
  name?: string;
}

const SectionFooter: React.FC<IProps> = memo(function SectionFooter(props) {
  const { name } = props;

  let showMessage = "显示全部";
  if (name) {
    showMessage = `显示更多${name}房源`;
  }

  // 事件处理逻辑
  const navigate = useNavigate();
  function moreClickHandle() {
    navigate("/entire");
  }
  return (
    <FooterWrapper color={name ? "#00848A" : "#000"}>
      <div className="info" onClick={moreClickHandle}>
        <span className="text">{showMessage}</span>
        <IconMoreArrow></IconMoreArrow>
      </div>
    </FooterWrapper>
  );
});

export default SectionFooter;
