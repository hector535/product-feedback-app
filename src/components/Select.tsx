import { useRef, useState } from "react";
import { Icon } from "@/components";

import { type Option } from "@/types";

type Props = {
  className?: string;
  options: Option[];
  value?: number | string;
  placeholder: string;
  onChange: (selectedValue: number | string) => void;
};

export const Select = ({
  className,
  options,
  value,
  placeholder,
  onChange,
}: Props) => {
  const [showOptions, setShowOptions] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  const selectedOption = options.find((o) => o.value === value);

  const ulVisibilityClasses = showOptions
    ? "scale-y-100 opacity-100"
    : "scale-y-0 opacity-0";

  const onFocusSelect = () => {
    clearInterval(timerRef.current);
  };

  const onBlurSelect = () => {
    timerRef.current = setTimeout(() => setShowOptions(false));
  };

  return (
    <div
      tabIndex={0}
      className={`${className} relative flex cursor-pointer items-center justify-between rounded-md border border-transparent bg-secondary-200 py-[0.6875rem] px-4 text-xs-2 font-normal text-secondary-500 hover:border-[#4661E6] md:text-[0.9375rem] md:leading-[1.375rem]`}
      onFocus={onFocusSelect}
      onBlur={onBlurSelect}
      onClick={() => setShowOptions(!showOptions)}
    >
      <span>{selectedOption ? selectedOption.label : placeholder}</span>
      {showOptions ? <Icon name="arrow-up" /> : <Icon name="arrow-down" />}

      <ul
        className={`${ulVisibilityClasses} select-shadow absolute top-[140%] left-0 z-10 w-full origin-top rounded-md bg-white transition duration-300`}
      >
        {options.map((opt) => (
          <li
            key={opt.value}
            tabIndex={showOptions ? 0 : -1}
            className="flex items-center justify-between border border-secondary-300 py-3 px-6 text-neutral-900 last:border-0 hover:text-primary"
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
            {selectedOption?.value === opt.value && <Icon name="check" />}
          </li>
        ))}
      </ul>
    </div>
  );
};
