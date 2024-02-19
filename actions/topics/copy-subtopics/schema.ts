import { z } from "zod";

export const formSchema = z.object({
  subTopicId: z.string().min(10),
});

export type formSchemaType = z.infer<typeof formSchema>;
