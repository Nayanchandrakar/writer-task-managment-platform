import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "welcome to chapters page",
  description: "write your own thoughts and manage it .",
};

const ChapterLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  if (!userId) redirect("/");

  return <div className="mt-16 ">{children}</div>;
};

export default ChapterLayout;
