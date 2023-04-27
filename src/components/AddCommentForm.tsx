import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MdKeyboardDoubleArrowUp,
  MdKeyboardDoubleArrowDown,
} from "react-icons/md";
import { Button } from "@/components";
import { commentSchema } from "@/schemas";
import { CommentForm } from "@/types";
import { commentApi } from "@/api";
import { useStore } from "@/store";

type Props = {
  feedbackId: number;
  className?: string;
};

const buttonText = {
  add: "Post",
  delete: "Post",
  edit: "Edit",
  reply: "Reply",
};

export const AddCommentForm = ({ feedbackId, className }: Props) => {
  const selectedComment = useStore((state) => state.selectedComment);
  const isCommentFormOpen = useStore(
    (state) => state.toggleableElements["comment-form"]
  );
  const mode = useStore((state) => state.mode);
  const setComment = useStore((state) => state.setComment);
  const toggleElement = useStore((state) => state.toggleElement);

  const title = {
    add: "Add Comment",
    delete: "Add Comment",
    edit: "Editing Comment",
    reply: `Replying to: ${selectedComment?.user.username}`,
  };

  const queryClient = useQueryClient();

  const onSuccessCB = {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
      await queryClient.invalidateQueries({ queryKey: ["comments"] });
      setComment(null, "add");
      toggleElement("comment-form", false);
      reset();
    },
  };

  const { mutate: addComment, isLoading: isAddingComment } = useMutation(
    commentApi.add,
    onSuccessCB
  );
  const { mutate: editComment, isLoading: isEditingComment } = useMutation(
    commentApi.edit,
    onSuccessCB
  );

  const isLoading = isAddingComment || isEditingComment;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<CommentForm>({
    defaultValues: {
      comment: "",
    },
    values: {
      comment: mode === "edit" ? selectedComment?.content || "" : "",
    },
    resolver: zodResolver(commentSchema.commentForm),
  });

  const onSubmit: SubmitHandler<CommentForm> = (data) => {
    if (mode === "edit") {
      editComment({ id: selectedComment!.id, content: data.comment });
      return;
    }

    addComment({
      content: data.comment,
      feedback: { id: feedbackId },
      replyingTo: mode === "reply" ? { id: selectedComment!.id } : null,
    });
  };

  useEffect(() => {
    if (isCommentFormOpen) {
      setFocus("comment");
    }
  }, [mode, isCommentFormOpen]);

  useEffect(() => {
    reset();
  }, [mode]);

  return (
    <article
      className={`${className} 
      ${isCommentFormOpen && "bottom-0"} 
      grid gap-4 rounded-lg-2 bg-white p-5`}
    >
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={() => toggleElement("comment-form", !isCommentFormOpen)}
      >
        <h2 className="text-lg font-bold">{title[mode]}</h2>
        {isCommentFormOpen ? (
          <MdKeyboardDoubleArrowDown className="arrow-icon" />
        ) : (
          <MdKeyboardDoubleArrowUp className="arrow-icon" />
        )}
      </div>

      <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <textarea
            className="input min-h-[5rem]"
            placeholder="Type your comment here"
            {...register("comment")}
          ></textarea>
          {errors.comment && (
            <p className="error-message">{errors.comment.message}</p>
          )}
        </div>

        <div className="grid flex-wrap gap-4 xs:flex xs:items-center xs:justify-between">
          <p>{250 - watch("comment").length} Characters left</p>
          <div className="grid gap-4  xs:flex xs:flex-row-reverse xs:items-center">
            <Button color="purple" loading={isLoading} disabled={isLoading}>
              {buttonText[mode]}
            </Button>
            {mode !== "add" && (
              <Button
                color="red"
                disabled={isLoading}
                type="button"
                onClick={() => {
                  setComment(null, "add");
                  toggleElement("comment-form", false);
                }}
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </form>
    </article>
  );
};
