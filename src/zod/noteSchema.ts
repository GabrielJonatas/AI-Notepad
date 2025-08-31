import { z } from 'zod';

export const ValidateNoteSchema = z.object({
  title: z.string().trim().min(1, { message: "Title cannot be empty" }),
  content: z.string(),
});
