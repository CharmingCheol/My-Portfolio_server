import boardsModel from "@models/boards";
import { NOT_FOUND_ID } from "@utils/const";

const getBoardById = async ({ _id }: { _id: string }) => {
  const result = await boardsModel.findById(_id);
  if (!result) return NOT_FOUND_ID;
  return result;
};

export default getBoardById;
