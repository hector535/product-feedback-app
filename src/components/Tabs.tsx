import { useEffect, useRef } from "react";

interface TabItem {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
}

type Props = {
  activeKey: string;
  className?: string;
  items: TabItem[];
  onChangeTab: (key: string) => void;
};

export const Tabs = ({ activeKey, className, items, onChangeTab }: Props) => {
  const indicatorRef = useRef<HTMLElement>(null);

  const getElementByActiveKey = () => {
    const parent = indicatorRef.current!.parentElement!;
    return parent.querySelector(`[data-tab-key='${activeKey}']`);
  };

  const onClickTab = (e: React.MouseEvent<HTMLSpanElement>, key: string) => {
    updateIndicator(e.currentTarget);
    onChangeTab(key);
  };

  const updateIndicator = (elem: HTMLElement) => {
    indicatorRef.current!.style.width = `${elem.clientWidth}px`;
    indicatorRef.current!.style.left = `${elem.offsetLeft}px`;
  };

  useEffect(() => {
    updateIndicator(getElementByActiveKey() as HTMLElement);
  }, []);

  useEffect(() => {
    const resizeHandler = () => {
      updateIndicator(getElementByActiveKey() as HTMLElement);
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [activeKey]);

  return (
    <div className={`${className} grid grid-rows-[auto_1fr]`}>
      <div className="relative grid auto-cols-fr grid-flow-col border-b border-b-neutral-400 text-center">
        {items.map((item) => (
          <span
            key={item.key}
            data-tab-key={item.key}
            className={`tab cursor-pointer py-4 px-2 font-bold ${
              activeKey === item.key ? "opacity-100" : "opacity-40"
            }`}
            onClick={(e) => onClickTab(e, item.key)}
          >
            {item.label}
          </span>
        ))}
        <span
          ref={indicatorRef}
          className="absolute bottom-0 left-0 h-[4px] bg-primary transition-[left] duration-300"
        ></span>
      </div>

      {items.find((i) => i.key === activeKey)?.children}
    </div>
  );
};
