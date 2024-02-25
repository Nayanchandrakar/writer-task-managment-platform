import { Chapter } from "@prisma/client";
import CreateChapters from "../_components/create-chapters";
import Image from "next/image";
import Link from "next/link";

interface MapChaptersProps {
  chapters: Chapter[] | null;
  workSpaceId: string | null;
  isPro: boolean;
}

const MapChapters = ({ chapters, isPro }: MapChaptersProps) => {
  return (
    <>
      <div className="flex items-center gap-x-3">
        {chapters?.map((chapter) => (
          <Link
            href={`/chapter/${chapter?.id}`}
            className="w-48 h-28  relative"
          >
            <Image
              src={chapter?.chapterImage}
              alt="chapter_image"
              sizes="100vw"
              width={1000}
              height={1000}
              className="w-full h-full rounded-sm"
            />
            <div className="w-full h-full absolute inset-0 bg-black/10 transition-colors duration-200 hover:bg-black/20 p-1.5 first-letter:uppercase rounded-sm">
              <span className="text-white font-semibold ">
                {chapter?.title}
              </span>
            </div>
          </Link>
        ))}
        <CreateChapters isPro={isPro} />
      </div>
    </>
  );
};

export default MapChapters;
