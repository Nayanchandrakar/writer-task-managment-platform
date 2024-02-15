import Container from "@components/ui/shared/container";
import { SubTopic, Topic } from "@prisma/client";
import Image from "next/image";
import MapTopics from "./map-topics";

interface ListTopicsProps {
  chapterImage: string;
  chapterId: string;
  topics: Topic[] &
    {
      subTopics: SubTopic[];
    }[];
}

const ListTopics = ({ chapterId, chapterImage, topics }: ListTopicsProps) => {
  return (
    <div className="w-full h-full relative inset-0">
      <Image
        width={1000}
        height={1000}
        className="w-full h-full fixed inset-0 z-10 "
        src={chapterImage}
        alt="chapter image"
      />
      <Container className="w-full z-30 absolute inset-0  mt-16  ">
        <div className="p-3 flex gap-3 w-full h-full">
          <MapTopics chapterId={chapterId} topics={topics} />
        </div>
      </Container>
    </div>
  );
};

export default ListTopics;
