import React, { memo, useState } from "react";
import { FilterWrapper } from "./style";
import filterData from "../../../assets/data/filter_data.json";
import classNames from "classnames";

// 定义 filterData 的类型
type FilterItem = string; // 假设 filterData 是一个字符串数组

const EntireFilter: React.FC = memo(() => {
  const [selectItems, setSelectItems] = useState<FilterItem[]>([]); // 定义 selectItems 的类型

  // 事件处理函数
  function itemClickHandle(item: FilterItem) {
    setSelectItems((prevItems) => {
      const newItems = [...prevItems];
      const itemIndex = newItems.indexOf(item);

      if (itemIndex > -1) {
        newItems.splice(itemIndex, 1); // 如果已选择，则移除
      } else {
        newItems.push(item); // 否则添加
      }
      return newItems;
    });
  }

  return (
    <FilterWrapper>
      <div className="filter">
        {filterData.map((item: FilterItem, index: number) => {
          return (
            <div
              className={classNames("item", {
                active: selectItems.includes(item),
              })}
              key={index} // 使用 index 作为 key，因为 item 本身是字符串
              onClick={() => itemClickHandle(item)}
            >
              {item}
            </div>
          );
        })}
      </div>
    </FilterWrapper>
  );
});

export default EntireFilter;
