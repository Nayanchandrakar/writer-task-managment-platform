import Container from "@components/ui/shared/container";
import { Chapter } from "@prisma/client";
import { Plus } from "lucide-react";
import Image from "next/image";
import CreateTopicForm from "./create-topic-form";

interface ListTopicsProps {
  chapter: Chapter;
}

const ListTopics = ({ chapter }: ListTopicsProps) => {
  return (
    <div className="w-full h-full relative inset-0">
      <Image
        width={1000}
        height={1000}
        className="w-full h-full fixed inset-0 z-10 "
        src={chapter?.chapterImage}
        alt="chapter image"
      />
      <Container className="w-full z-30 absolute inset-0 h-[12rem] mt-16 grid grid-cols-6 ">
        <div className="p-3">
          <CreateTopicForm />
        </div>
      </Container>
    </div>
  );
};

export default ListTopics;
