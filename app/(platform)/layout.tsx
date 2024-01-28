import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/style/globals.css";
import { auth } from "@clerk/nextjs";
import Sidebar from "./_components/Sidebar";
import prismadb from "@lib/prismadb";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Notes Page",
  description: "Welcome to writer Notes page",
};

const font = Inter({
  subsets: ["latin"],
  weight: "500",
});

export default async function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  if (!userId) return redirect("/");

  const workSpace = await prismadb?.workSpace?.findMany({
    where: {
      userId: userId,
    },
    include: {
      notes: true,
    },
  });

  return (
    <main>
      <div className="w-0 border-r border-zinc-200 fixed inset-0 h-full z-[70]  flex md:w-72">
        <Sidebar workSpaces={workSpace} />
      </div>
      <div className="mt-16 md:ml-72">{children}</div>
    </main>
  );
}
