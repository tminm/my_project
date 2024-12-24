import React, { memo, useEffect, useRef, useState, ReactNode } from "react";
import { ViewWrapper } from "./style";
import IconArrowLeft from "../../assets/svg/icon-arrow-left";
import IconArrowRight from "../../assets/svg/icon-arrow-right";

// 定义组件 Props 类型
interface ScrollViewProps {
  children: ReactNode; // 子节点类型
}

const ScrollView: React.FC<ScrollViewProps> = memo(function ScrollView(props) {
  // 定义内部状态
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [posIndex, setPosIndex] = useState(0);
  const totalDistanceRef = useRef<number>(0);

  // `scrollContentRef` 用于引用滚动内容容器
  const scrollContentRef = useRef<HTMLDivElement>(null);

  // 组件渲染完毕, 判断是否显示右侧按钮
  useEffect(() => {
    if (scrollContentRef.current) {
      const scrollWidth = scrollContentRef.current.scrollWidth; // 一共可以滚动的宽度
      const clientWidth = scrollContentRef.current.clientWidth; // 本身可以占据的宽度
      const totalDistance = scrollWidth - clientWidth;
      totalDistanceRef.current = totalDistance;
      setShowRight(totalDistance > 0);
    }
  }, [props.children]);

  // 事件处理逻辑
  function controlClickHandle(isRight: boolean) {
    if (!scrollContentRef.current) return;

    const newIndex = isRight ? posIndex + 1 : posIndex - 1;
    const newEl = scrollContentRef.current.children[newIndex] as HTMLElement;

    if (newEl) {
      const newElOffsetLeft = newEl.offsetLeft;
      scrollContentRef.current.style.transform = `translate(-${newElOffsetLeft}px)`;
      setPosIndex(newIndex);

      // 是否显示左右侧按钮
      setShowRight(totalDistanceRef.current > newElOffsetLeft);
      setShowLeft(newElOffsetLeft > 0);
    }
  }

  return (
    <ViewWrapper>
      {showLeft && (
        <div className="control left" onClick={() => controlClickHandle(false)}>
          <IconArrowLeft />
        </div>
      )}
      {showRight && (
        <div className="control right" onClick={() => controlClickHandle(true)}>
          <IconArrowRight />
        </div>
      )}
      <div className="scroll">
        <div className="scroll-content" ref={scrollContentRef}>
          {props.children}
        </div>
      </div>
    </ViewWrapper>
  );
});

export default ScrollView;
