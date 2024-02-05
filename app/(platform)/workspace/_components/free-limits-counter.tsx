import { Progress } from "@components/ui/progress";
import { MAX_FREE_lIMIT_COUNT } from "@constants/index";

interface FreeLimitsCounterProps {}

const FreeLimitsCounter = ({}) => {
  return (
    <div className="bg-gray-100 rounded-lg w-full h-fit p-8 flex flex-col space-y-3 items-start justify-center">
      <span className="text-sm font-medium text-gray-600">
        <span className="mr-1">2/{MAX_FREE_lIMIT_COUNT?.workspace}</span>
        Free workspace creations
      </span>

      <Progress className="bg-white" value={44} />
    </div>
  );
};

export default FreeLimitsCounter;
