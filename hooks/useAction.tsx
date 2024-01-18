import { useState, useCallback } from "react";

import { handlerType, fieldErrors } from "../types/action-types";

type Action<Tinput, Toutput> = (
  data: Tinput
) => Promise<handlerType<Tinput, Toutput>>;

interface UseActionOptions<Toutput> {
  onSuccess?: (data: Toutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

export const useAction = <Tinput, Toutput>(
  action: Action<Tinput, Toutput>,
  options: UseActionOptions<Toutput> = {}
) => {
  const [fieldErrors, setFieldErrors] = useState<
    fieldErrors<Tinput> | undefined
  >(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [data, setData] = useState<Toutput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (input: Tinput) => {
      setIsLoading(true);

      try {
        const result = await action(input);

        if (!result) {
          return;
        }

        setFieldErrors(result.fieldErrors);

        if (result.error) {
          setError(result.error);
          options.onError?.(result.error);
        }

        if (result.data) {
          setData(result.data);
          options.onSuccess?.(result.data);
        }
      } finally {
        setIsLoading(false);
        options.onComplete?.();
      }
    },
    [action, options]
  );

  return {
    execute,
    fieldErrors,
    error,
    data,
    isLoading,
  };
};
