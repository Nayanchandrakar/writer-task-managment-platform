interface chapterIdPageProps {
  params: {
    chapterId: string | null;
    workSpaceId: string | null;
    noteId: string | null;
  };
}

const chapterIdPage = ({ params }: chapterIdPageProps) => {
  return <div>chapterIdPage {params?.chapterId}</div>;
};

export default chapterIdPage;
