import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="w-full h-screen">
      <Loader className="size-6 animate-spin text-sky-600" />
    </div>
  );
};

export default Loading;
