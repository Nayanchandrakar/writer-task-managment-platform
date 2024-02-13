import { z } from "zod";

export const formSchema = z.object({
  chapterId: z.string().min(3),
});

export type formSchemaType = z.infer<typeof formSchema>;
