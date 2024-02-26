import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface LogoProps {}

const Logo: FC<LogoProps> = ({}) => {
  return (
    <Link href="/" className="md:inline-block hidden">
      <Image
        alt="image-not-available"
        sizes="100vw"
        className="w-24 h-12 mix-blend-multiply "
        src="/images/logo.jpg"
        width={1000}
        height={1000}
      />
    </Link>
  );
};

export default Logo;
