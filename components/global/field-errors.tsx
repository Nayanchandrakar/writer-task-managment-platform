type FieldErrorsProps = {
  id: string;
  error: Record<string, string[]> | undefined;
};

const FieldErrors = ({ error, id }: FieldErrorsProps) => {
  if (!error) null;

  return (
    <div className="">
      {error?.[id]?.map((data) => (
        <span className="text-red-600 text-sm duration-200 transition-colors hover:text-red-500">
          {data}
        </span>
      ))}
    </div>
  );
};

export default FieldErrors;
