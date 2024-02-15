import Container from "@components/ui/shared/container";
import TitleEditForm from "./title-edit-form";
import ChapterNavbarActions from "./chapter-navbar-actions";
import { Chapter } from "@prisma/client";

interface ChapterFormProps {
  chapter: Chapter;
}

const ChapterForm = ({ chapter }: ChapterFormProps) => {
  return (
    <div className="bg-black/50 text-white z-40 h-16 w-full absolute inset-0">
      <Container className="w-full flex items-center justify-between h-full">
        <TitleEditForm
          chapterTitle={chapter?.title}
          chapterId={chapter?.id}
          noteId={chapter?.noteId!}
        />
        <ChapterNavbarActions chapterId={chapter?.id} />
      </Container>
    </div>
  );
};

export default ChapterForm;
