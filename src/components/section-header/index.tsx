import React, { memo } from "react";
import { HeaderWrapper } from "./style";

// 定义组件的 Props 类型
interface SectionHeaderProps {
  title: string; // 标题为必填
  subtitle?: string; // 副标题为可选
}

const SectionHeader: React.FC<SectionHeaderProps> = memo(
  function SectionHeader({ title, subtitle }) {
    return (
      <HeaderWrapper>
        <h2 className="title">{title}</h2>
        {subtitle && <div className="subtitle">{subtitle}</div>}
      </HeaderWrapper>
    );
  }
);

export default SectionHeader;
