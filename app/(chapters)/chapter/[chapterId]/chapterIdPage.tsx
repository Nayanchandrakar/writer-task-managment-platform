import { auth } from "@clerk/nextjs";
import prismadb from "@lib/prismadb";
import { redirect } from "next/navigation";
import { chapterIdPageProps } from "./page";

export const chapterIdPage = async ({ params }: chapterIdPageProps) => {
  const { userId } = auth();

  if (!userId) redirect("/");

  const chapter = await prismadb?.chapter?.findFirst({
    where: {
      userId,
      id: params?.chapterId,
    },
  });

  if (!chapter) redirect("/");

  return <section className="">{/* <ChapterForm /> */}</section>;
};
