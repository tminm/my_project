import React, { memo } from "react";
import { FooterWrapper } from "./style";
import footerData from "../../assets/data/footer.json";

interface FooterItem {
  name: string;
  list: string[];
}

const AppFooter = memo(() => {
  return (
    <FooterWrapper>
      <div className="wrapper">
        <div className="service">
          {(footerData as FooterItem[]).map((item) => {
            return (
              <div className="item" key={item.name}>
                <div className="name">{item.name}</div>
                <div className="list">
                  {item.list.map((listItem) => {
                    return (
                      <div className="item" key={listItem}>
                        {listItem}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="statement">
          © 2025 MyProject, Inc. All rights reserved.条款 · 隐私政策 · 网站地图
          · 全国旅游投诉渠道 12301
        </div>
      </div>
    </FooterWrapper>
  );
});

export default AppFooter;
