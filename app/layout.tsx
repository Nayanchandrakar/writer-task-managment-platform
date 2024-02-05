import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/style/globals.css";
import { ClerkProvider, auth } from "@clerk/nextjs";
import Navbar from "../components/ui/header/Navbar";
import CreatWorkSpace from "./(platform)/_components/create-workspace-modal";
import { Toaster } from "sonner";
import CreateNoteModal from "./(platform)/_components/create-notes-modal";
import SubscriptionModal from "@components/global/subscription-modal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Writer",
  description: "Writer a platform for devs and managers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar userId={userId} />
          <Toaster />
          <CreatWorkSpace />
          <CreateNoteModal />
          <SubscriptionModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
