import { Icon } from "@/components";
import { useStore } from "@/store";

type Props = {
  className?: string;
};

export const Gradient = ({ className }: Props) => {
  const isDrawerOpen = useStore((state) => state.toggleableElements.drawer);
  const toggleElement = useStore((state) => state.toggleElement);

  return (
    <div
      className={`gradient flex items-center justify-between py-4 px-6 text-white md:h-auto md:items-end md:justify-start md:rounded-lg-2 md:p-6 ${className}`}
    >
      <div>
        <h1 className="text-[0.9375rem] font-bold leading-[1.375rem] md:text-[1.25rem] md:leading-[1.8125rem]">
          Frontend Mentor
        </h1>
        <h2 className="font-medium opacity-75 md:text-[0.9375rem] md:leading-[1.375rem]">
          Feedback Board
        </h2>
      </div>
      <Icon
        name="hamburger"
        className="cursor-pointer md:hidden"
        onClick={() => toggleElement("drawer", !isDrawerOpen)}
      />
    </div>
  );
};
