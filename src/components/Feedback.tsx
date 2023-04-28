import { useNavigate } from "react-router-dom";
import { Button, CommentCounter, Disc, UpvoteCounter } from "@/components";
import { useUpvoteFeedback } from "@/hooks/useUpvoteFeedback";
import { type FeedbackWithStatus } from "@/types";

type Props = {
  feedback: FeedbackWithStatus;
};

export const Feedback = ({ feedback }: Props) => {
  const { mutate } = useUpvoteFeedback();
  const navigate = useNavigate();

  const colors: Record<string, string> = {
    "in-progress": "border-t-primary",
    planned: "border-t-accent-orange",
    live: "border-t-accent-sky",
  };

  return (
    <article
      className={`cursor-pointer rounded-lg-2 border-t-[7px] bg-white p-6 ${
        colors[feedback.status.name]
      }`}
      onClick={() => navigate(`/feedback/details/${feedback.id}`)}
    >
      <span className="mb-4 flex items-center gap-2 text-xs-2 capitalize text-neutral-900">
        <Disc
          color={feedback.status.name as "planned" | "live" | "in-progress"}
        />
        {feedback.status.name}
      </span>

      <h3 className="mb-2 text-xs-2 font-bold">{feedback.title}</h3>
      <p className="mb-6">{feedback.content}</p>

      <Button.Category className="mb-4">
        {feedback.category.name}
      </Button.Category>

      <div className="flex items-center justify-between">
        <UpvoteCounter
          upvotes={feedback.upvotes}
          active={feedback.hasUpvoted}
          onClick={(e) => {
            e.stopPropagation();
            mutate(feedback.id);
          }}
        />
        <CommentCounter comments={feedback.commentCounter} />
      </div>
    </article>
  );
};
