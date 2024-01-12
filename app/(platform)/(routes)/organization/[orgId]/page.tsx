const OrganizationPage = async ({
  params,
}: {
  params: {
    orgId: string;
  };
}) => {
  const { orgId } = params;

  return <div className="">{orgId}</div>;
};

export default OrganizationPage;
