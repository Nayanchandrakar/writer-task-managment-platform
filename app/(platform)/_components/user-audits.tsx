import { getUserAudits } from "@actions/audit/getUserAudits";
import { useUser } from "@clerk/nextjs";
import AuditData from "@components/global/audit-data";

const UserAudits = async () => {
  const logs = await getUserAudits();
  const { user } = useUser();

  return (
    <div className="gap-y-4">
      {logs?.map((audit) => (
        <AuditData key={audit?.id} logs={audit} user={user} />
      ))}
    </div>
  );
};

export default UserAudits;
