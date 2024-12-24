import classNames from "classnames";
import React, { memo, useState } from "react";
import { TabsWrapper } from "./style";

interface SearchTabsProps {
  titles: string[];
  tabClick?: (index: number) => void;
}

const SearchTabs: React.FC<SearchTabsProps> = memo((props) => {
  const { titles, tabClick } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  function itemClickHandle(index: number) {
    setCurrentIndex(index);
    if (tabClick) tabClick(index);
  }

  return (
    <TabsWrapper>
      {titles.map((item, index) => {
        return (
          <div
            className={classNames("item", { active: currentIndex === index })}
            key={item}
            onClick={(e) => itemClickHandle(index)}
          >
            <span className="text">{item}</span>
            <span className="bottom"></span>
          </div>
        );
      })}
    </TabsWrapper>
  );
});

export default SearchTabs;
