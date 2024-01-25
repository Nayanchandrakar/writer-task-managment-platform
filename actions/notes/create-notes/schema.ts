import { z } from "zod";

export const formSchema = z.object({
  noteTitle: z.string().min(3).max(30),
  workSpaceId: z.string().min(3).max(40),
});

export type formSchemaType = z.infer<typeof formSchema>;
