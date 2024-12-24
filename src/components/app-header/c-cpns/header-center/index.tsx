import React, { memo, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import CenterWrapper from "./style";

import SearchTitles from "../../../../assets/data/search_titles.json";
import SearchTabs from "./c-cpns/search-tabs";
import SearchSections from "./c-cpns/search-sections";
import IconSearchBar from "../../../../assets/svg/icon-search-bar";

interface HeaderCenterProps {
  isSearch: boolean;
  searchBarClick?: (value: boolean) => void;
}

const HeaderCenter: React.FC<HeaderCenterProps> = memo((props) => {
  const { isSearch, searchBarClick } = props;
  const [tabIndex, setTabIndex] = useState<number>(0);
  const titles = SearchTitles.map((item) => item.title);

  // 创建 DOM 引用
  const searchDetailRef = useRef<HTMLDivElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  function searchBarClickHandle() {
    if (searchBarClick) searchBarClick(true);
  }

  return (
    <CenterWrapper>
      <CSSTransition
        in={isSearch}
        classNames="bar"
        timeout={250}
        unmountOnExit={true}
        nodeRef={searchDetailRef} // 添加 nodeRef
      >
        <div className="search-detail" ref={searchDetailRef}>
          <SearchTabs titles={titles} tabClick={setTabIndex}></SearchTabs>
          <div className="infos">
            <SearchSections
              searchInfos={SearchTitles[tabIndex].searchInfos}
            ></SearchSections>
          </div>
        </div>
      </CSSTransition>
      <CSSTransition
        in={!isSearch}
        classNames="detail"
        timeout={250}
        unmountOnExit={true}
        nodeRef={searchBarRef} // 添加 nodeRef
      >
        <div
          className="search-bar"
          onClick={searchBarClickHandle}
          ref={searchBarRef}
        >
          <div className="text">搜索房源和体验</div>
          <div className="icon">
            <IconSearchBar></IconSearchBar>
          </div>
        </div>
      </CSSTransition>
    </CenterWrapper>
  );
});

export default HeaderCenter;
