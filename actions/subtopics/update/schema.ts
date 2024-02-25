import { z } from "zod";

export const formSchema = z.object({
  description: z.string().optional(),
  subTopicId: z.string().min(10),
});

export type formSchemaType = z.infer<typeof formSchema>;
