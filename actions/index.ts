import { formSchemaType } from "@/actions/schema";
import { auth } from "@clerk/nextjs";
import { handlerOutputType } from "./types";

const handler = async (req: formSchemaType): Promise<handlerOutputType> => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: "Unauthorized user!",
    };
  }

  const {name} = req;

  
  return {
    data: "HELLO",
  };
};

export const createWorkSpaceAction = 
