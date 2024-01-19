import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(3).max(30),
});

export type formSchemaType = z.infer<typeof formSchema>;
