import Container from "@components/ui/shared/container";
import { FC } from "react";
import Logo from "./Logo";
import Actions from "./Actions";

interface NavbarProps {
  userId: string | null | undefined;
}

const Navbar: FC<NavbarProps> = ({ userId }) => {
  return (
    <header className="w-full h-[68px] border-b border-b-zinc-200 fixed inset-0 top-0 z-[80] bg-white">
      <Container className="w-full h-full flex items-center justify-between">
        <Logo />
        <Actions userId={userId} />
      </Container>
    </header>
  );
};

export default Navbar;
