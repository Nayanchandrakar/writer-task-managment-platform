"use client";

import DialogModal from "@components/modals/dialog-modal";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { defaultImages } from "@constants/images";
import { useCreateChapterModal } from "@hooks/use-create-chapter-modal";
import { unsplash } from "@lib/unsplash";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

interface CreateChapterModalProps {}

const CreateChapterModal: FC<CreateChapterModalProps> = ({}) => {
  const createChapterModal = useCreateChapterModal((state) => ({
    isOpen: state.isOpen,
    onOpen: state.onOpen,
    onClose: state.onClose,
  }));

  const [Images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages);
  const [IsLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchImage = async () => {
      setIsLoading(true);
      try {
        const result = await unsplash?.photos?.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });

        if (result && result?.response) {
          const newImages = result.response as Array<Record<string, any>>;
          setImages(newImages);
        } else {
          console.log("failed to get images from unsplash!");
        }
      } catch (error) {
        setImages(defaultImages);
        console.log("An error occured try after some time");
      } finally {
        setIsLoading(false);
      }
    };
    fetchImage();
  }, []);

  return (
    <DialogModal
      isOpen={true}
      onOpen={createChapterModal?.onOpen}
      onClose={createChapterModal?.onClose}
    >
      <span className="text-center text-lg font-semibold text-slate-700">
        Create chapter
      </span>

      {IsLoading && (
        <div className="py-16 flex items-center justify-center">
          <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 my-5">
        {Images?.map((image) => (
          <div className="w-full  rounded-sm overflow-hidden h-24">
            <Image
              src={image?.urls?.thumb}
              alt="unsplash-image"
              width={1000}
              height={1000}
              sizes="100vw"
              className="object-cover  w-full h-full"
            />
          </div>
        ))}
      </div>

      <span className="text-lg font-semibold text-slate-600">
        Chapter title
      </span>
      <div className="space-y-4 w-full h-fit">
        <Input className="w-full " />
        <Button className="bg-sky-700 hover:bg-sky-700/90 w-full">
          Create
        </Button>
      </div>
    </DialogModal>
  );
};

export default CreateChapterModal;
