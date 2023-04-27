import { Button, CommentCounter, Paper, UpvoteCounter } from "@/components";
import { useUpvoteFeedback } from "@/hooks";
import { FeedbackWithoutComments } from "@/types";

type Props = {
  className?: string;
  feedback: FeedbackWithoutComments;
  onClick?: () => void;
};

export const Suggestion = ({ className, feedback, onClick }: Props) => {
  const { mutate } = useUpvoteFeedback();

  const hasCursorPointer = onClick ? "cursor-pointer" : "";

  return (
    <Paper
      key={feedback.id}
      className={`${className} grid ${hasCursorPointer} md:grid-cols-[auto_minmax(0,_1fr)_auto] md:gap-10`}
      onClick={onClick}
    >
      <UpvoteCounter
        upvotes={feedback.upvotes}
        active={feedback.hasUpvoted}
        className="row-start-2 justify-self-start md:row-start-auto md:inline-grid md:justify-items-center md:gap-3 md:self-start md:justify-self-auto md:py-2 md:px-3"
        onClick={(e) => {
          e.stopPropagation();
          mutate(feedback.id);
        }}
      />
      <div className="md:gap-4.5 col-span-2 col-start-1 grid gap-3.5 md:col-span-1 md:col-start-2 md:row-start-1">
        <h2 className="font-bold text-secondary-500 md:text-lg md:leading-[1.625rem]">
          {feedback.title}
        </h2>

        {feedback.enabled ? (
          <p>{feedback.content}</p>
        ) : (
          <span className="font-bold">[DELETED]</span>
        )}

        <Button.Category className="mb-4 mt-1 justify-self-start capitalize md:mb-0">
          {feedback.category.name}
        </Button.Category>
      </div>

      <CommentCounter
        comments={feedback.commentCounter}
        className="row-start-2 self-center justify-self-end md:col-start-3 md:row-auto md:row-start-1 md:self-center md:justify-self-auto"
      />
    </Paper>
  );
};
