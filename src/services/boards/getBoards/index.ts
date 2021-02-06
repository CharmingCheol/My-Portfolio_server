import boardsModel from "@models/boards";

const PAGE_SIZE = 10;
export const DEFAULT_PAGE = 1;

export const checkParameters = async (page: number) => {
  const totalDocumentCount = await boardsModel.estimatedDocumentCount();
  if (page <= 0) return DEFAULT_PAGE; // page가 음수
  if (totalDocumentCount < page) return DEFAULT_PAGE; // page가 총 갯수보다 클 경우
  if (totalDocumentCount <= (page - 1) * PAGE_SIZE) return DEFAULT_PAGE; // 시작점이 총 갯수와 같거나 클 경우
  return page; // if절에 걸리지 않으면 page를 그대로 return
};

const getBoards = async ({ page = DEFAULT_PAGE }: { page: number }) => {
  const checkedPage = await checkParameters(page);
  const result = await boardsModel
    .find({})
    .skip((checkedPage - 1) * PAGE_SIZE)
    .limit(PAGE_SIZE);
  return result;
};

export default getBoards;
