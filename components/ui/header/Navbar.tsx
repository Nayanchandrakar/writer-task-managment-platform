import Container from "@components/ui/shared/container";
import { FC } from "react";
import Logo from "./Logo";
import Actions from "./Actions";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  return (
    <header className="w-full h-[68px] border-b border-b-zinc-200 sticky inset-0 top-0 z-[80] bg-white">
      <Container className="w-full h-full flex items-center justify-between">
        <Logo />
        <Actions />
      </Container>
    </header>
  );
};

export default Navbar;
