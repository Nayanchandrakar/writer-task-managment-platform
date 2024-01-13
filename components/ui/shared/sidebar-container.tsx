import { FC } from "react";

interface SidebarContainerProps {
  className?: string;
  children: React.ReactNode;
}

const SidebarContainer: FC<SidebarContainerProps> = ({
  className,
  children,
}) => {
  return <div className="mx-auto max-w-7xl ">{children}</div>;
};

export default SidebarContainer;
