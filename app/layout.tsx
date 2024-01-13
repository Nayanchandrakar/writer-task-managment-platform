import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/style/globals.css";
import { ClerkProvider, auth } from "@clerk/nextjs";
import Navbar from "../components/ui/header/Navbar";

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
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
