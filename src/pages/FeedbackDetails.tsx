import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Icon,
  Suggestion,
  CommentList,
  AddCommentForm,
  Modal,
} from "@/components";
import { useGetComments, useGetFeedbackForPreview } from "@/hooks";
import { useStore } from "@/store";
import { commentApi } from "@/api";
import { getMaxDepthBasedOnViewport } from "@/utils";

const FeedbackDetails = () => {
  const { id, commentId } = useParams();

  const feedbackId = +id!;

  const feedback = useGetFeedbackForPreview(feedbackId);
  const comments = useGetComments(feedbackId, +commentId!);

  const selectedComment = useStore((state) => state.selectedComment);
  const isDeleteCommentModalOpen = useStore(
    (state) => state.toggleableElements["delete-comment"]
  );

  const toggleElement = useStore((state) => state.toggleElement);
  const setFeedback = useStore((state) => state.setFeedback);
  const setComment = useStore((state) => state.setComment);
  const setMaxDepth = useStore((state) => state.setMaxDepth);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(commentApi.remove, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["comments"] });
      toggleElement("delete-comment", false);
      setComment(null, "add");
    },
  });

  useEffect(() => {
    let clearId: NodeJS.Timeout;

    const resizeHandler = () => {
      const maxDepth = getMaxDepthBasedOnViewport();

      if (clearId) clearTimeout(clearId);

      clearId = setTimeout(() => setMaxDepth(maxDepth), 500);
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  useEffect(() => {
    if (feedback) setFeedback(feedback);
  }, [feedback]);

  return (
    <main className="mx-auto grid w-[90%] max-w-[45.625rem] gap-6 pt-6 pb-[5rem] md:pt-14">
      <div className="flex items-center justify-between">
        <Button.Link
          icon={<Icon name="arrow-left" />}
          onClick={() => {
            toggleElement("comment-form", false);
            setComment(null, "add");
            setFeedback(null);
            navigate(-1);
          }}
        >
          Go Back
        </Button.Link>
        {feedback.canEdit && feedback.enabled && (
          <Button
            color="blue"
            onClick={() => {
              toggleElement("comment-form", false);
              setComment(null, "add");
              setFeedback(null);
              navigate(`/feedback/${feedback.id}`);
            }}
          >
            Edit Feedback
          </Button>
        )}
      </div>

      <Suggestion feedback={feedback as any} />

      <div className="rounded-lg-2 bg-white p-6">
        <h2 className="text-lgt mb-6 font-bold">
          {feedback.commentCounter} Comments
        </h2>
        <CommentList comments={comments} />
      </div>

      {feedback.enabled && (
        <AddCommentForm className="add-comment-form" feedbackId={feedback.id} />
      )}

      <Modal
        className="grid max-w-[25rem] gap-5"
        isOpen={isDeleteCommentModalOpen}
        onOutsideClick={() => toggleElement("delete-comment", false)}
      >
        <h1 className="text-xl font-bold">Delete confirmation</h1>
        <p>You are about to delete the following comment:</p>
        <p className="mb-2 italic">{selectedComment?.content}</p>

        <div className="flex justify-end gap-4">
          <Button
            color="dark-blue"
            onClick={() => toggleElement("delete-comment", false)}
          >
            Cancel
          </Button>
          <Button
            color="red"
            loading={isLoading}
            disabled={isLoading}
            onClick={() => mutate(selectedComment!.id)}
          >
            OK
          </Button>
        </div>
      </Modal>
    </main>
  );
};

export default FeedbackDetails;
