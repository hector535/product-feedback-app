import { Icon } from "@/components";

type Props = {
  className?: string;
  comments: number;
};

export const CommentCounter = ({ className, comments }: Props) => {
  return (
    <div
      className={`flex items-center gap-2 text-xs-2 font-bold text-secondary-500 md:text-base md:leading-[1.4375rem] ${className}`}
    >
      <Icon name="comments" />
      <span>{comments}</span>
    </div>
  );
};
