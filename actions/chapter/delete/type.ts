import { handlerType } from "../../../types/action-types";
import { formSchemaType } from "./schema";
import { Chapter } from "@prisma/client";

export type handlerOutputType = handlerType<formSchemaType, Chapter>;
