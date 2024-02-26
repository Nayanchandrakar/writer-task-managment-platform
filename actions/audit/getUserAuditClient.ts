"use server";

import { getUserAudits } from "./getUserAudits";

const getUserAuditClient = async (take: number) => {
  const res = await getUserAudits(take);
  return res;
};

export default getUserAuditClient;
