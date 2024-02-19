import { z } from "zod";

export const formSchema = z.object({
  chapterId: z.string(),
  subTopics: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      position: z.number(),
      topicId: z.string().nullable(),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
});

export type formSchemaType = z.infer<typeof formSchema>;
