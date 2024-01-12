import Link from "next/link";
import { FC } from "react";

interface LogoProps {}

const Logo: FC<LogoProps> = ({}) => {
  return (
    <Link
      href="/"
      className="md:inline-block hidden font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
    >
      Writer
    </Link>
  );
};

export default Logo;
