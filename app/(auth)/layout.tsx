import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/style/globals.css";

export const metadata: Metadata = {
  title: "Auth page",
  description: "Welcome to writer auth page",
};

const font = Inter({
  subsets: ["latin"],
  weight: "500",
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "w-full h-screen  flex items-center justify-center bg-gradient-to-b from-fuchsia-600 to-pink-600"
      )}
    >
      {children}
    </div>
  );
}
