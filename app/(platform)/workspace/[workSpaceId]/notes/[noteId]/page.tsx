import Container from "@components/ui/shared/container";
import prismadb from "@lib/prismadb";
import { redirect } from "next/navigation";
import { FC } from "react";
import Label from "../_components/Label";
import { Building } from "lucide-react";
import MapChapters from "../_components/map-chapters";

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
        description="create your own chapters."
        name={note?.noteTitle}
      />
      <div className="mt-6">
        <MapChapters />
      </div>
    </Container>
  );
};

export default NotesPage;
