import React from "react";
import { Comment } from "@/components";
import { useStore } from "@/store";
import type { Comment as CommentType } from "@/types";

type Props = {
  comments: CommentType[] | null;
  depth?: number;
};

export const CommentList = ({ comments, depth = 0 }: Props) => {
  const maxDepth = useStore((state) => state.maxDepth);

  return (
    <React.Fragment key={depth}>
      {comments?.map((c) => (
        <Comment key={c.id} comment={c} depth={depth}>
          {depth < maxDepth && c.comments ? (
            <CommentList comments={c.comments} depth={depth + 1} />
          ) : null}
        </Comment>
      ))}
    </React.Fragment>
  );
};
