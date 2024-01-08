import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Auth page",
  description: "welcome to auth page",
};

const font = Inter({
  weight: "500",
  subsets: ["latin"],
});

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  <div
    className={cn(
      "w-full h-screen  flex items-center justify-center bg-gradient-to-b from-fuchsia-600 to-pink-600",
      font.className
    )}
  >
    {children}
  </div>;
};

export default AuthLayout;
