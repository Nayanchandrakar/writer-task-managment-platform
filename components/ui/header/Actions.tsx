"use client";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Button } from "@components/ui/button";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface ActionsProps {
  orgId: string | null | undefined;
  userId: string | null | undefined;
}

const Actions: FC<ActionsProps> = ({ orgId, userId }) => {
  const router = useRouter();

  const isAuth = !!userId;
  const hasOrg = !!orgId;

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
        hasOrg && (
          <>
            <OrganizationSwitcher
              hidePersonal
              afterCreateOrganizationUrl="/organization/:id"
              afterLeaveOrganizationUrl="/craeate-organization"
              afterSelectOrganizationUrl="/organization/:id"
            />
            <UserButton afterSignOutUrl="/" />
          </>
        )
      )}
    </div>
  );
};

export default Actions;
