"use client";
import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface ActionsProps {}

const Actions: FC<ActionsProps> = ({}) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between flex-row space-x-6">
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
    </div>
  );
};

export default Actions;
