import { handlerType } from "@/types/action-types";
import { formType } from "./schema";
import { Chapter } from "@prisma/client";

export type handlerOutputType = handlerType<formType, Chapter>;
