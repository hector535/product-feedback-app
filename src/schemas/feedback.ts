import { z } from "zod";
import { globalSchema } from "@/schemas";
import { schemaUtil } from "@/utils";
import { type Comment } from "@/types";

const { id } = globalSchema;
const { createString } = schemaUtil;

const title = createString({ fieldName: "title", min: 1, max: 255 });
const content = createString({ fieldName: "content", min: 1, max: 255 });
const enabled = z.boolean({
  required_error: "enabled is required",
  invalid_type_error: "enabled must be a boolean",
});

const upvotes = z
  .number({
    invalid_type_error: "upvotes must be a positive integer",
  })
  .int({ message: "upvotes must be a positive integer" })
  .gte(0, { message: "upvotes must be a positive integer" });
const commentCounter = z
  .number({
    invalid_type_error: "commentCounter must be a positive integer",
  })
  .int({ message: "commentCounter must be a positive integer" })
  .gte(0, { message: "commentCounter must be a positive integer" });

const canEdit = z.boolean({
  required_error: "canEdit is required",
  invalid_type_error: "canEdit must be a boolean",
});

const hasUpvoted = z.boolean({
  required_error: "hasUpvoted is required",
  invalid_type_error: "hasUpvoted must be a boolean",
});

export const newForm = z.object({
  title,
  content,
  category: z.object({
    id,
  }),
});

export const editForm = z.object({
  title,
  content,
  category: z.object({
    id,
  }),
  status: z.object({
    id,
  }),
});

export const countByStatus = z.object({
  planned: z.coerce.number(),
  "in-progress": z.coerce.number(),
  live: z.coerce.number(),
});

export const getAll = z.object({
  total: z.number(),
  data: z.array(
    z.object({
      id,
      title,
      content,
      enabled,
      category: z.object({
        id,
        name: createString({ fieldName: "name", min: 1, max: 255 }),
      }),
      status: z.object({
        id,
        name: createString({ fieldName: "name", min: 1, max: 255 }),
      }),
      upvotes,
      commentCounter,
      hasUpvoted,
    })
  ),
});

export const getByIdForEdit = z.object({
  title,
  content,
  status: z.object({
    id,
  }),
  category: z.object({
    id,
  }),
});

export const comment = z.object({
  id,
  content,
  enabled,
  user: z.object({
    id,
    name: createString({ fieldName: "name", min: 1, max: 255 }),
    username: createString({ fieldName: "username", min: 1, max: 255 }),
    img: createString({ fieldName: "img", min: 1, max: 255 }),
  }),
});

export const extendedComment: z.ZodType<Comment> = comment.extend({
  comments: z.lazy(() => extendedComment.array().nullable()),
});

export const comments = extendedComment.array().nullable();

export const getByIdForPreview = z.object({
  id,
  title,
  content,
  enabled,
  category: z.object({
    id,
    name: createString({ fieldName: "name", min: 1, max: 255 }),
  }),
  upvotes,
  commentCounter,
  canEdit,
  hasUpvoted,
});
