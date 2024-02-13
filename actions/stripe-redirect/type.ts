import { z } from "zod";

import { handlerType } from "../../types/action-types";

import { StripeRedirect } from "./schema";

export type InputType = z.infer<typeof StripeRedirect>;
export type ReturnType = handlerType<InputType, string>;
