interface pageProps {
  params: {
    chapterId: string;
    noteId: string;
    workSpaceId: string;
  };
}

const chapterIdPage = ({ params }: pageProps) => {
  return <div>{params?.chapterId}</div>;
};

export default chapterIdPage;
