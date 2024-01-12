import OrgController from "@components/ui/shared/org-controller";

const OrgIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OrgController />
      {children}
    </>
  );
};

export default OrgIdLayout;
