import boardsModel from "@models/boards";
import { NOT_FOUND_ID } from "@utils/const";

interface UpdateBoardParams {
  body: string;
  category: string;
  hashtag: string[];
  id: string;
  thumbnail: string;
  title: string;
}

const updateBoard = async ({ body, category, hashtag, id, thumbnail, title }: UpdateBoardParams) => {
  const updated = await boardsModel.findOneAndUpdate(
    { _id: id },
    { body, category, hashtag, thumbnail, title },
    { new: true },
  );
  if (!updated) return NOT_FOUND_ID;
  return updated;
};

export default updateBoard;
