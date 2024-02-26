"use client";

import { FC } from "react";
import { Menu } from "lucide-react";
import { useMobileMenu } from "@hooks/use-mobile-menu";

interface MobileMenuProps {}

const MobileMenu: FC<MobileMenuProps> = ({}) => {
  const mobileMenu = useMobileMenu();

  return (
    <Menu
      onClick={() => mobileMenu?.onOpen()}
      className="size-7 cursor-pointer md:hidden"
    />
  );
};

export default MobileMenu;
