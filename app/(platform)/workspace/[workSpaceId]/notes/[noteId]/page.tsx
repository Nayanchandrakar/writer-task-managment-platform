import Container from "@/components/ui/shared/container";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { FC } from "react";
import Label from "../_components/Label";
import { Building } from "lucide-react";
import MapChapters from "../_components/map-chapters";
import { auth } from "@clerk/nextjs";
import { getSubscription } from "@/actions/subscription/get";

interface NotesPageProps {
  params: {
    workSpaceId: string;
    noteId: string;
  };
}

const NotesPage: FC<NotesPageProps> = async ({ params }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const note = await prismadb?.note?.findFirst({
    where: {
      id: params?.noteId,
      workSpaceId: params?.workSpaceId,
    },
  });

  if (!note) redirect("/workspace");

  const chapters = await prismadb?.chapter.findMany({
    where: {
      userId,
      noteId: note?.id,
    },
  });

  const { isPro } = await getSubscription();

  return (
    <Container className="pt-20">
      <Label LabelIcon={Building} name={note?.noteTitle} isPro={isPro} />
      <div className="mt-6">
        <MapChapters
          isPro={isPro}
          chapters={chapters}
          workSpaceId={params?.workSpaceId}
        />
      </div>
    </Container>
  );
};

export default NotesPage;
