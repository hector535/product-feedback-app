import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { type Comment as CommentType } from "@/types";
import { Button } from "@/components";
import { useStore } from "@/store";
import { MdModeEditOutline, MdOutlineDeleteOutline } from "react-icons/md";

type Props = {
  className?: string;
  comment: CommentType;
  depth: number;
  children?: React.ReactNode;
};

export const Comment = ({ className, comment, depth, children }: Props) => {
  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(true);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);

  const userId = useStore((state) => state.id);
  const selectedFeedback = useStore((state) => state.selectedFeedback);
  const maxDepth = useStore((state) => state.maxDepth);
  const setComment = useStore((state) => state.setComment);
  const toggleElement = useStore((state) => state.toggleElement);

  const { user, content } = comment;

  const borderBottomStyles =
    depth >= 1 ? "" : "border-b border-neutral-300 py-6 md:py-8";

  const gapStyles = isExpanded ? "gap-y-4" : "gap-y-0";

  const handleMode = (mode: "reply" | "edit") => {
    setComment(comment, mode);
    toggleElement("comment-form", true);
  };

  const handleClickImgAvatar = () => {
    if (!children) return;
    if (!paragraphRef.current || !childrenRef.current) return;

    if (isExpanded) {
      collapseElements(paragraphRef.current, childrenRef.current);
    } else {
      expandElements(paragraphRef.current, childrenRef.current);
    }

    setIsExpanded((prevState) => !prevState);
  };

  return (
    <>
      <div
        className={`${className} ${borderBottomStyles} ${gapStyles} comment-container grid grid-cols-[auto_1fr] gap-x-4 last:border-0 last:pb-0 first-of-type:pt-0 md:gap-x-8`}
      >
        <img
          className="col-start-1 row-start-1 h-10 w-10 cursor-pointer rounded-full"
          src={`/img/image-${user.img}`}
          alt="avatar"
          onClick={handleClickImgAvatar}
        />

        <div className="col-start-2 row-start-1 flex flex-wrap items-center justify-between gap-2 text-xs-2 md:text-sm">
          <h3 className=" font-bold">
            {user.name}
            <br />
            <span className="font-normal text-neutral-900">
              {user.username}
            </span>
          </h3>

          {selectedFeedback?.enabled && comment.enabled && (
            <div className="flex items-center gap-2.5">
              <Button.Link
                className="font-semibold text-secondary-400 hover:underline"
                onClick={() => handleMode("reply")}
              >
                Reply
              </Button.Link>

              {userId === comment.user.id && (
                <>
                  <Button.Link onClick={() => handleMode("edit")}>
                    <MdModeEditOutline className="fill-black-300 hover:fill-black-600 text-lg" />
                  </Button.Link>
                  <Button.Link
                    onClick={() => {
                      setComment(comment, "delete");
                      toggleElement("comment-form", false);
                      toggleElement("delete-comment", true);
                    }}
                  >
                    <MdOutlineDeleteOutline className="fill-red-400 text-lg hover:fill-red-600" />
                  </Button.Link>
                </>
              )}
            </div>
          )}
        </div>

        <p
          className={`comment-content col-span-2 col-start-1 row-start-2 md:col-span-1 md:col-start-2 md:text-[0.9375rem]`}
          ref={paragraphRef}
        >
          {comment.enabled ? (
            <span className="whitespace-pre-wrap">{content}</span>
          ) : (
            <span className="font-bold">[DELETED]</span>
          )}
        </p>

        {depth >= maxDepth && comment.comments && (
          <Button.Link
            className="col-span-2 col-start-1 cursor-pointer text-secondary-500 hover:underline"
            onClick={() =>
              navigate(
                `/feedback/details/${selectedFeedback?.id}/comments/${comment.id}`
              )
            }
          >
            [CONTINUE THIS THREAD]
          </Button.Link>
        )}

        {children && (
          <div
            className={`comment-content col-span-2 col-start-1 mt-2 grid gap-6 border-l border-gray-300 pl-6 md:ml-3.5`}
            ref={childrenRef}
          >
            {children}
          </div>
        )}
      </div>
    </>
  );
};

const collapseElements = (
  paragraphElement: HTMLParagraphElement,
  children: HTMLDivElement
) => {
  const paragraphInnerHeight = paragraphElement.scrollHeight;
  const childrenInnerHeight = children.scrollHeight;

  const paragraphTransition = paragraphElement.style.transition;
  const childrenTransition = children.style.transition;

  paragraphElement.style.transition = "";
  children.style.transition = "";

  requestAnimationFrame(() => {
    paragraphElement.style.height = `${paragraphInnerHeight}px`;
    children.style.height = `${childrenInnerHeight}px`;

    paragraphElement.style.transition = paragraphTransition;
    children.style.transition = childrenTransition;

    requestAnimationFrame(() => {
      paragraphElement.style.height = `0px`;
      children.style.height = `0px`;
    });
  });
};

const expandElements = (
  paragraphElement: HTMLParagraphElement,
  children: HTMLDivElement
) => {
  const paragraphInnerHeight = paragraphElement.scrollHeight;
  const childrenInnerHeight = children.scrollHeight;

  paragraphElement.style.height = `${[paragraphInnerHeight]}px`;
  children.style.height = `${[childrenInnerHeight]}px`;

  const paragraphTransitionHandler = () => {
    paragraphElement.style.height = "auto";
    paragraphElement.removeEventListener(
      "transitionend",
      paragraphTransitionHandler
    );
  };

  const childrenTransitionHandler = () => {
    children.style.height = "auto";
    children.removeEventListener("transitionend", childrenTransitionHandler);
  };

  paragraphElement.addEventListener(
    "transitionend",
    paragraphTransitionHandler
  );
  children.addEventListener("transitionend", childrenTransitionHandler);
};
