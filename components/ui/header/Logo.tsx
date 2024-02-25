import Link from "next/link";
import { FC } from "react";

interface LogoProps {}

const Logo: FC<LogoProps> = ({}) => {
  return (
    <Link
      href="/"
      className="inline-block font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-pink-600"
    >
      Writer
    </Link>
  );
};

export default Logo;
