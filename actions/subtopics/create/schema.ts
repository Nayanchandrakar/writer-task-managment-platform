import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(30),
  topicId: z.string().min(10),
});

export type formSchemaType = z.infer<typeof formSchema>;
