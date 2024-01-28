import Container from "@components/ui/shared/container";
import FreeLimitsCounter from "./_components/free-limits-counter";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface workSpacePageProps {}

const workSpacePage = async ({}) => {
  const { userId } = auth();

  if (!userId) redirect("/");

  return (
    <Container>
      <div className="pt-16">
        <FreeLimitsCounter />
      </div>
    </Container>
  );
};

export default workSpacePage;
