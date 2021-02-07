import boardsModel from "@models/boards";
import checkPageNumber from "@utils/checkPageNumber";
import { PAGE_SIZE } from "@utils/const";

const getBoards = async ({ page }: { page: number }) => {
  const pageIndex = await checkPageNumber({ model: boardsModel, page });
  const result = await boardsModel
    .find({})
    .skip((pageIndex - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE);
  return result;
};

export default getBoards;
