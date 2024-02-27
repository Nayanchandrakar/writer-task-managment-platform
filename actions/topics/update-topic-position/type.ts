import { handlerType } from "@/types/action-types";
import { formSchemaType } from "./schema";
import { Topic } from "@prisma/client";

export type handlerOutputType = handlerType<formSchemaType, Topic[]>;
