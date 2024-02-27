"use client";

import { FC } from "react";
import { Menu } from "lucide-react";
import { useMobileMenu } from "@/hooks/use-mobile-menu";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface MobileMenuProps {}

const MobileMenu: FC<MobileMenuProps> = ({}) => {
  const mobileMenu = useMobileMenu();
  const pathname = usePathname();

  return (
    <Menu
      onClick={() => mobileMenu?.onOpen()}
      className={cn(
        "size-7 cursor-pointer md:hidden",
        pathname == "/" && "hidden"
      )}
    />
  );
};

export default MobileMenu;
