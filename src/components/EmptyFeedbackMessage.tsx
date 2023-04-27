import { Button } from "@/components";

import { ReactComponent as EmptyIcon } from "@/assets/suggestions/illustration-empty.svg";
import { useNavigate } from "react-router-dom";

export const EmptyFeedbackMessage = () => {
  const navigate = useNavigate();

  return (
    <article className="grid h-full content-center justify-items-center rounded-lg-2 bg-white p-7 text-center">
      <EmptyIcon className="mb-9" />
      <h3 className="mb-4 text-lg font-bold md:text-2xl">
        There is no feedback yet.
      </h3>
      <p className="mb-6 text-neutral-900 lg:mb-12 lg:w-3/4">
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.
      </p>

      <Button color="purple" onClick={() => navigate("/feedback")}>
        + Add Feedback
      </Button>
    </article>
  );
};
