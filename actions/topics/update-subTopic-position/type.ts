import { handlerType } from "../../../types/action-types";
import { formSchemaType } from "./schema";
import { SubTopic } from "@prisma/client";

export type handlerOutputType = handlerType<formSchemaType, SubTopic[]>;
