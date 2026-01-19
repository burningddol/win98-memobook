import { z } from "zod";

export const createMemoSchema = z.object({
  name: z
    .string()
    .trim()
    .max(50, "Name must be 50 characters or less")
    .optional()
    .transform((val) => val || undefined),
  title: z
    .string()
    .trim()
    .max(100, "Title must be 100 characters or less")
    .optional()
    .transform((val) => val || undefined),
  content: z
    .string()
    .trim()
    .min(1, "Content is required")
    .max(2000, "Content must be 2000 characters or less"),
});

export const replySchema = z.object({
  reply: z
    .string()
    .trim()
    .max(2000, "Reply must be 2000 characters or less")
    .optional()
    .transform((val) => val || undefined),
});

export type CreateMemoInput = z.infer<typeof createMemoSchema>;
export type ReplyInput = z.infer<typeof replySchema>;
