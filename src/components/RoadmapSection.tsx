import { Virtuoso } from "react-virtuoso";
import { Feedback } from "@/components";

import { type FeedbackWithStatus } from "@/types";

type Props = {
  className?: string;
  title: string;
  description: string;
  feedbacks: FeedbackWithStatus[];
};

export const RoadmapSection = ({
  className,
  title,
  description,
  feedbacks,
}: Props) => {
  return (
    <div className={`${className} grid grid-rows-[auto_auto_1fr]`}>
      <h2 className="mb-1 text-lg font-bold">{title}</h2>
      <p className="mb-6 text-neutral-900">{description}</p>
      <div>
        <Virtuoso
          className="suggestion-list"
          data={feedbacks}
          itemContent={(_, feedback) => (
            <Feedback key={feedback.id} feedback={feedback} />
          )}
        />
      </div>
    </div>
  );
};
