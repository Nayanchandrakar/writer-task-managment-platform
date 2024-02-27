"use client";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface ActionsProps {
  userId: string | null | undefined;
}

const Actions: FC<ActionsProps> = ({ userId }) => {
  const router = useRouter();

  const isAuth = !!userId;

  return (
    <div className="flex items-center justify-center flex-row space-x-6">
      {!isAuth ? (
        <>
          <Button
            onClick={() => router.push("/sign-in")}
            variant="outline"
            size="sm"
          >
            Login
          </Button>

          <Button onClick={() => router.push("/sign-up")} size="sm">
            Get it for free
          </Button>
        </>
      ) : (
        <UserButton afterSignOutUrl="/" />
      )}
    </div>
  );
};

export default Actions;
