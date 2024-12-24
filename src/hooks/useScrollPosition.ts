import { useEffect, useState } from "react";
import { throttle } from "underscore";

export default function useScrollPosition(): {
  scrollX: number;
  scrollY: number;
} {
  //状态来记录位置
  const [scrollX, setScrollX] = useState<number>(0);
  const [scrollY, setScrollY] = useState<number>(0);

  //监听windos滚动
  useEffect(() => {
    const handleScroll = throttle(function () {
      setScrollX(window.scrollX);
      setScrollY(window.scrollY);
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { scrollX, scrollY };
}
