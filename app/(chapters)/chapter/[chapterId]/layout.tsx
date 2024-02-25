import { auth } from "@clerk/nextjs";
import prismadb from "@lib/prismadb";
import { notFound, redirect } from "next/navigation";
import ChapterForm from "./_components/chapter-form";

export async function generateMetadata({
  params,
}: {
  params: { chapterId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    return {
      title: "Chapter",
    };
  }

  const chapter = await prismadb.chapter.findFirst({
    where: {
      id: params.chapterId,
      userId,
    },
  });

  return {
    title: chapter?.title || "Chapter",
  };
}

const ChapterLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { chapterId: string };
}) => {
  const { userId } = auth();

  if (!userId) redirect("/");

  const chapter = await prismadb?.chapter?.findFirst({
    where: {
      userId,
      id: params?.chapterId,
    },
  });

  if (!chapter) {
    return notFound();
  }

  return (
    <div
      className="relative h-screen bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${chapter?.chapterImage})` }}
    >
      <ChapterForm chapter={chapter} />
      <div className="absolute  inset-0 bg-black/10 " />
      <main className="relative pt-40 h-full">{children}</main>
    </div>
  );
};

export default ChapterLayout;
