import { z } from "zod";

export const formSchema = z.object({
  imageUrl: z.string().min(3),
  chapterTitle: z.string().min(2).max(45),
  noteId: z.string().min(6),
});

export type formType = z.infer<typeof formSchema>;
