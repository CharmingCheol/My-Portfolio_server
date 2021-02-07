import boardsModel from "@models/boards";
import checkPageNumber from "@utils/checkPageNumber";
import { PAGE_SIZE } from "@utils/const";

const getCategoryBoards = async ({ category, page }: { category: string; page: number }) => {
  const pageIndex = await checkPageNumber({ model: boardsModel, page });
  const boardList = await boardsModel
    .find({ category })
    .skip((pageIndex - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE);
  return boardList;
};

export default getCategoryBoards;
