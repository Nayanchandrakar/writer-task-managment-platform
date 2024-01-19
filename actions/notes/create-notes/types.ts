import { handlerType } from "../../../types/action-types";
import { formSchemaType } from "./schema";
import { Note } from "@prisma/client";

export type handlerOutputType = handlerType<formSchemaType, Note>;
