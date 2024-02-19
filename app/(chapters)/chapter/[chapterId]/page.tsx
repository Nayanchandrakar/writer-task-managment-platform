import { auth } from "@clerk/nextjs";
import prismadb from "@lib/prismadb";
import { redirect } from "next/navigation";
import ListTopics from "./_components/list-topics";
import Container from "@components/ui/shared/container";

interface chapterIdPageProps {
  params: {
    chapterId: string;
  };
}

const chapterIdPage = async ({ params }: chapterIdPageProps) => {
  const { userId } = auth();

  if (!userId) redirect("/");

  const topics = await prismadb?.topic?.findMany({
    where: {
      userId,
      chapterId: params?.chapterId,
    },
    include: {
      SubTopic: {
        orderBy: {
          position: "asc",
        },
      },
    },
    orderBy: {
      position: "asc",
    },
  });

  return (
    <Container className=" h-full overflow-x-hidden">
      {/* @ts-ignore  */}
      <ListTopics topics={topics} chapterId={params?.chapterId} />
    </Container>
  );
};

export default chapterIdPage;
