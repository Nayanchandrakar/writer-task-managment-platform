import { auth } from "@clerk/nextjs";
import Container from "@/components/ui/shared/container";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { FC } from "react";
import WorkSpaceButton from "./_components/work-space-create-button";

interface workSpaceIdPageProps {
  params: {
    workSpaceId: string;
  };
}

const workSpaceIdPage: FC<workSpaceIdPageProps> = async ({ params }) => {
  const { userId } = auth();

  if (!userId) redirect("/");

  const workSpace = await prismadb?.workSpace?.findFirst({
    where: {
      userId,
      id: params?.workSpaceId,
    },
  });

  if (!workSpace) redirect("/");

  return (
    <Container className="flex items-center justify-center w-full h-screen flex-col space-y-3">
      <h1 className="text-xl font-medium">
        Welcome to your workpace{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
          {workSpace?.name}!
        </span>
      </h1>
      <WorkSpaceButton workSpaceId={workSpace?.id} className="w-40" />
    </Container>
  );
};

export default workSpaceIdPage;
