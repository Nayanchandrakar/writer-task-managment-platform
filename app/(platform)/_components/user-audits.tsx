import { getUserAudits } from "@actions/audit/getUserAudits";
import { ActivitySquare } from "lucide-react";
import Label from "../workspace/[workSpaceId]/notes/_components/Label";
import MapAudits from "./map-audits";

const UserAudits = async () => {
  const logs = await getUserAudits(0);

  return (
    <div className=" mt-16 ">
      <Label LabelIcon={ActivitySquare} name={"Your activity"} isPro={true} />
      <MapAudits logs={logs} />
    </div>
  );
};

export default UserAudits;
