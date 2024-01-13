import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/style/globals.css";
import { auth } from "@clerk/nextjs";
import Sidebar from "./_components/Sidebar";

export const metadata: Metadata = {
  title: "Notes Page",
  description: "Welcome to writer Notes page",
};

const font = Inter({
  subsets: ["latin"],
  weight: "500",
});

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  if (!userId) return null;

  return (
    <main>
      <div className="w-72 border-r border-zinc-200 fixed inset-0 h-full z-[70] ">
        <Sidebar />
      </div>
      <div className="mt-16 md:ml-72">{children}</div>
    </main>
  );
}
