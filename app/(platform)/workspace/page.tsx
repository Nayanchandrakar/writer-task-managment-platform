import Container from "@components/ui/shared/container";
import FreeLimitsCounter from "./_components/free-limits-counter";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import WorkSpaceCard from "./_components/workspace-card";
import { getCounters } from "@actions/workspace/counts";

interface workSpacePageProps {}

const workSpacePage = async ({}) => {
  const { userId } = auth();

  if (!userId) redirect("/");

  const { notesCount, workSpaceCount } = await getCounters();

  return (
    <Container>
      <div className="pt-16">
        <FreeLimitsCounter />
        <div className="flex space-x-3 items-center mt-8">
          <WorkSpaceCard counts={workSpaceCount} label="Total Workspaces" />
          <WorkSpaceCard counts={notesCount} label="Total Notes" />
        </div>
      </div>
    </Container>
  );
};

export default workSpacePage;
