import React, { memo } from "react";
import { SectionsWrapper } from "./style";

interface SearchInfo {
  title: string;
  desc: string;
}

interface SearchSectionsProps {
  searchInfos: SearchInfo[];
}

const SearchSections: React.FC<SearchSectionsProps> = memo(
  ({ searchInfos }) => {
    return (
      <SectionsWrapper>
        {searchInfos.map((item, index) => {
          return (
            <div className="item" key={index}>
              <div className="info">
                <div className="title">{item.title}</div>
                <div className="desc">{item.desc}</div>
              </div>
              {index !== searchInfos.length - 1 && (
                <div className="divider"></div>
              )}
            </div>
          );
        })}
      </SectionsWrapper>
    );
  }
);

export default SearchSections;
