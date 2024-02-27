import { handlerType } from "@/types/action-types";
import { formSchemaType } from "@/actions/workspace/create-worspace/schema";
import { WorkSpace } from "@prisma/client";

export type handlerOutputType = handlerType<formSchemaType, WorkSpace>;
