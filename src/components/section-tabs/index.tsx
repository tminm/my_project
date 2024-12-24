import React, { memo, useState } from "react";
import { TabsWrapper } from "./style";
import classNames from "classnames";
import ScrollView from "../../base-ui/scroll-view";

interface SectionTabsProps {
  tabNames: string[] | undefined; // 定义标签名的数组
  tabClick: (index: number, item: string) => void; // 定义点击回调函数
}

const SectionTabs: React.FC<SectionTabsProps> = memo(function SectionTabs({
  tabNames = [],
  tabClick,
}) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  function itemClickHandle(index: number, item: string) {
    setCurrentIndex(index);
    tabClick(index, item); // 回调传递选中的索引和内容
  }

  return (
    <TabsWrapper>
      <ScrollView>
        {tabNames.map((item, index) => {
          return (
            <div
              key={index}
              className={classNames("item", { active: index === currentIndex })}
              onClick={() => itemClickHandle(index, item)}
            >
              {item}
            </div>
          );
        })}
      </ScrollView>
    </TabsWrapper>
  );
});

export default SectionTabs;
