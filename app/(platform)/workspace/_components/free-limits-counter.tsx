import { getLimits } from "@actions/global/getLimits";
import { Progress } from "@components/ui/progress";
import { MAX_FREE_lIMIT_COUNT } from "@constants/index";

const FreeLimitsCounter = async () => {
  const { workSpaceLimit } = await getLimits();

  const percentage =
    Math.floor(MAX_FREE_lIMIT_COUNT?.workspace / workSpaceLimit) * 100;

  return (
    <div className="bg-gray-100 rounded-lg w-full h-fit p-8 flex flex-col space-y-3 items-start justify-center">
      <span className="text-sm font-medium text-gray-600">
        <span className="mr-1">
          {MAX_FREE_lIMIT_COUNT?.workspace}/{workSpaceLimit}
        </span>
        Free workspace creations
      </span>

      <Progress className="bg-white" value={percentage} />
    </div>
  );
};

export default FreeLimitsCounter;
