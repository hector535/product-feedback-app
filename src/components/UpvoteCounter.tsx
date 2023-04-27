import { Icon } from "./Icon";

type Props = {
  className?: string;
  upvotes: number;
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export const UpvoteCounter = ({
  className,
  upvotes,
  active,
  onClick,
}: Props) => {
  return (
    <div
      className={`inline-flex cursor-pointer items-center gap-2.5 rounded-lg-2 bg-secondary-300 px-4 py-1.5 text-xs-2 font-bold ${
        active
          ? "bg-secondary-400 text-white"
          : "transition-colors duration-300 hover:bg-secondary-350"
      } ${className}`}
      onClick={onClick}
    >
      <Icon name="arrow-up" className={`${active ? "stroke-white" : ""}`} />
      {upvotes}
    </div>
  );
};
