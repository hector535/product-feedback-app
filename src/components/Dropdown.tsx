import { useRef, useState } from "react";
import { type Option } from "@/types";

import { Icon } from "./Icon";

type Props = {
  className?: string;
  options: Option[];
  value: number | string;
  onChange: (selectedValue: number | string) => void;
};

export const Dropdown = ({ className, options, value, onChange }: Props) => {
  const [showOptions, setShowOptions] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>(null!);

  const filterVisibleClassnames = showOptions
    ? "scale-y-100 opacity-100"
    : "scale-y-0 opacity-0";

  const onClickFilter = () => {
    setShowOptions(!showOptions);
  };

  const onFocusFilter = () => {
    clearTimeout(timerRef.current);
  };

  const onBlurFilter = () => {
    timerRef.current = setTimeout(() => setShowOptions(false));
  };

  const onKeyDownFilter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "Enter" || e.code === "Space") {
      setShowOptions(!showOptions);
    }
  };

  return (
    <div
      tabIndex={0}
      className={`relative cursor-pointer select-none ${className}`}
      onKeyDown={onKeyDownFilter}
      onClick={onClickFilter}
      onFocus={onFocusFilter}
      onBlur={onBlurFilter}
    >
      <div className="flex items-center gap-2 text-secondary-325">
        <p className="text-sm">
          Sorted by:{" "}
          <span className="font-bold">
            {options.find((o) => o.value === value)?.label}
          </span>
        </p>
        {showOptions ? (
          <Icon name="arrow-up" className="mt-0.5 stroke-white" />
        ) : (
          <Icon name="arrow-down" className="mt-0.5 stroke-white" />
        )}
      </div>
      <ul
        className={`dropdown-shadow absolute top-[140%] z-10 w-52 origin-top rounded-lg-2 bg-white text-sm font-normal text-neutral-900 transition duration-300 md:w-64 md:text-base ${filterVisibleClassnames}`}
      >
        {options.map((opt) => (
          <li
            key={opt.value}
            tabIndex={0}
            className="flex items-center justify-between border-b border-secondary-350 py-3 px-6 transition-colors duration-200 last:border-b-0 hover:text-primary"
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
            {opt.value === value && <Icon name="check" />}
          </li>
        ))}
      </ul>
    </div>
  );
};
