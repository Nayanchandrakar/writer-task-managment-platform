import { auth } from "@clerk/nextjs";
import prismadb from "@lib/prismadb";
import { redirect } from "next/navigation";
import ChapterForm from "./_components/chapter-form";
import ListTopics from "./_components/list-topics";

interface chapterIdPageProps {
  params: {
    chapterId: string;
  };
}

const chapterIdPage = async ({ params }: chapterIdPageProps) => {
  const { userId } = auth();

  if (!userId) redirect("/");

  const chapter = await prismadb?.chapter?.findFirst({
    where: {
      userId,
      id: params?.chapterId,
    },
  });

  if (!chapter) redirect("/");

  const topics = await prismadb?.topic?.findMany({
    where: {
      chapterId: chapter?.id,
      userId,
    },
    orderBy: {
      position: "asc",
    },
  });

  const topicIds = topics?.map((topic) => topic?.id) || [];

  const subTopics = await prismadb?.subTopic?.findMany({
    where: {
      topicId: {
        in: topicIds,
      },
      userId,
    },
    orderBy: {
      position: "asc",
    },
  });

  // Combine topics with their respective subtopics
  const topicSubtopic = topics?.map((topic) => ({
    ...topic,
    subTopics: subTopics?.filter((subTopic) => subTopic.topicId === topic.id),
  }));

  return (
    <section className="mt-16 relative inset-0">
      <ChapterForm chapter={chapter} />

      <ListTopics
        chapterId={chapter?.id}
        chapterImage={chapter?.chapterImage}
        topics={topicSubtopic}
      />
    </section>
  );
};

export default chapterIdPage;
