import { z } from "zod";

export type fieldErrors<Tinput> = {
  [k in keyof Tinput]: string[];
};

export type handlerType<Tinput, Toutput> = {
  fieldErrors?: fieldErrors<Tinput>;
  error?: string | null;
  data?: Toutput;
};

export const actionHandler = async <Tinput, Toutput>(
  schema: z.Schema<Tinput>,
  handler: (validatedData: Tinput) => Promise<handlerType<Tinput, Toutput>>
) => {
  return async (data: Tinput): Promise<handlerType<Tinput, Toutput>> => {
    const validationResult = schema.safeParse(data);
    if (!validationResult.success) {
      return {
        fieldErrors: validationResult.error.flatten()
          .fieldErrors as fieldErrors<Tinput>,
      };
    }

    return handler(validationResult.data);
  };
};
