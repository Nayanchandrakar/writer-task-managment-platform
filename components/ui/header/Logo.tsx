"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface LogoProps {}

const Logo: FC<LogoProps> = ({}) => {
  const pathname = usePathname();

  return (
    <Link
      href="/"
      className={cn(
        "md:inline-block hidden",
        pathname === "/" && "inline-block "
      )}
    >
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
