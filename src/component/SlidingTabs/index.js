import { act, useEffect, useState } from "react";
import "./style.css";
/**
 * 计算元素相对于指定祖先元素的坐标偏移
 * @param {HTMLElement} element - 目标元素
 * @param {HTMLElement} ancestor - 祖先元素
 * @returns { {x: number, y: number} } 相对坐标
 * @throws 若祖先不包含元素则抛出错误
 */
function getElementOffset(element, ancestor) {
  // 验证祖先关系
  if (!ancestor.contains(element)) {
    throw new Error("Element is not a descendant of the specified ancestor");
  }
  // 获取元素及祖先的视口坐标
  const elementRect = element.getBoundingClientRect();
  const ancestorRect = ancestor.getBoundingClientRect();

  // 计算祖先边框宽度（影响内容区域起点）
  const ancestorBorderLeft = ancestor.clientLeft; // 左边框宽度
  const ancestorBorderTop = ancestor.clientTop; // 上边框宽度

  // 计算相对坐标（考虑边框偏移）
  return {
    x: elementRect.left - ancestorRect.left - ancestorBorderLeft,
    y: elementRect.top - ancestorRect.top - ancestorBorderTop,
  };
}
export default () => {
  const [active, setActive] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [items, setItems] = useState([
    {
      key: "Upcoming",
      title: "我们的日常",
      // notification: 2
    },
    {
      key: "Develop",
      title: "Develop",
    },
    {
      key: "Completed",
      title: "Completed",
    },
  ]);
  useEffect(() => {
    const w = document.querySelector('.sliding-tabs-container .sliding-tabs');
    w.children[0].click();
  }, []);
  return (
    <div className="sliding-tabs-container">
      <div className="sliding-tabs">
        {items.map((item, index) => {
          return (
            <label
              className={`tab ${item.key === active ? "active" : "none"}`}
              key={item.key}
              onClick={(e) => {
                const rect = getElementOffset(
                  e.target,
                  document.querySelector(".sliding-tabs-container")
                );
                console.log(rect);
                setPosition(rect);
                setActive(item.key);
              }}
            >
              {item.title}
              {item.notification && <span className="notification">2</span>}
            </label>
          );
        })}
      </div>
      <span className="glider" style={{ top: position.y, left: position.x, display: position.x + position.y === 0 ? 'none' : 'block' }}></span>
    </div>
  );
};
