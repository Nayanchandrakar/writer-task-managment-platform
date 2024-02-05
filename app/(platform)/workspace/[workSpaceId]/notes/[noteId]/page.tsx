import Container from "@components/ui/shared/container";
import prismadb from "@lib/prismadb";
import { redirect } from "next/navigation";
import { FC } from "react";
import FreeLimitsCounter from "../../../_components/free-limits-counter";
import Label from "../_components/Label";
import { Building } from "lucide-react";

interface NotesPageProps {
  params: {
    workSpaceId: string;
    noteId: string;
  };
}

const NotesPage: FC<NotesPageProps> = async ({ params }) => {
  const note = await prismadb?.note?.findFirst({
    where: {
      id: params?.noteId,
      workSpaceId: params?.workSpaceId,
    },
  });

  if (!note) redirect("/workspace");

  return (
    <Container className="pt-20">
      <Label
        LabelIcon={Building}
        description="create your own notes"
        name={note?.noteTitle}
      />
    </Container>
  );
};

export default NotesPage;
