import { getUserAudits } from "@actions/audit/getUserAudits";
import { currentUser } from "@clerk/nextjs";
import AuditData from "@components/global/audit-data";
import { ActivitySquare } from "lucide-react";
import Label from "../workspace/[workSpaceId]/notes/_components/Label";

const UserAudits = async () => {
  const logs = await getUserAudits();
  const user = await currentUser();

  return (
    <div className=" mt-16 ">
      <Label LabelIcon={ActivitySquare} name={"Your activity"} isPro={true} />

      <div className="space-y-4 mt-8">
        {logs?.map((audit) => (
          <AuditData key={audit?.id} logs={audit} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserAudits;
