import { z } from "zod";

export const formSchema = z.object({
  chapterId: z.string(),
  topics: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      position: z.number(),
      chapterId: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
});

export type formSchemaType = z.infer<typeof formSchema>;
