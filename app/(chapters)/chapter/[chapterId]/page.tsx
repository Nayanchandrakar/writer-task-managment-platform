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

  return (
    <section className="mt-16 relative inset-0">
      <ChapterForm chapter={chapter} />
      <ListTopics chapter={chapter} />
    </section>
  );
};

export default chapterIdPage;
