export type fieldErrors<Tinput, Toutput> = {
  [k in keyof Toutput]: string;
};

export type handlerType<Tinput, Toutput> = {
  fieldErrors?: fieldErrors<Tinput, Toutput>;
  error?: string;
  data?: Toutput;
};

export const actionHandler = async <Tinput, Toutput>(
  handler: handlerType<Tinput, Toutput>
): Promise<Toutput> => {
  try {
  } catch (error) {
    return {};
  }
};
