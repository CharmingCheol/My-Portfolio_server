import boardsModel from "@models/boards";

const getCategoryBoardsCount = async ({ category }: { category: string }) => {
  const count = await boardsModel.countDocuments({ category });
  return count;
};

export default getCategoryBoardsCount;
