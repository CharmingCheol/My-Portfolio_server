import boardsModel from "@models/boards";
import { DEFAULT_PAGE_INDEX } from "@utils/const";
import checkParameters from "./index";

describe("utils/checkPageNumber", () => {
  it("page가 0이나 음수라면, page를 1로 변경한다", async () => {
    const minus = await checkParameters({ model: boardsModel, page: -1 });
    const zero = await checkParameters({ model: boardsModel, page: 0 });
    expect(minus).toBe(DEFAULT_PAGE_INDEX);
    expect(zero).toBe(DEFAULT_PAGE_INDEX);
  });

  it("page가 전체 게시글 수보다 많으면 1로 변경한다", async () => {
    boardsModel.estimatedDocumentCount = jest.fn().mockReturnValue(20);
    const excess = await checkParameters({ model: boardsModel, page: 21 });
    expect(excess).toBe(DEFAULT_PAGE_INDEX);
  });

  it("(page-1)*limit이 전체 게시글 수와 같거나 크다면, page를 1로 변경한다", async () => {
    boardsModel.estimatedDocumentCount = jest.fn().mockReturnValue(100);
    const normal = await checkParameters({ model: boardsModel, page: 10 });
    const excess = await checkParameters({ model: boardsModel, page: 11 });
    expect(normal).toBe(10);
    expect(excess).toBe(DEFAULT_PAGE_INDEX);
  });

  it("page 인자값 검사에 이상이 없을 경우, page 인자값을 그대로 return한다", async () => {
    boardsModel.estimatedDocumentCount = jest.fn().mockReturnValue(100);
    const one = await checkParameters({ model: boardsModel, page: 1 });
    const ten = await checkParameters({ model: boardsModel, page: 10 });
    expect(one).toBe(1);
    expect(ten).toBe(10);
  });
});
