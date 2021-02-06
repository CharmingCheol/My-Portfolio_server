import boardsModel from "@models/boards";
import getBoards, { checkParameters, DEFAULT_PAGE } from "./index";

describe("getBoards Service", () => {
  it("getBoards 함수를 호출한다", () => {
    expect(typeof getBoards).toBe("function");
  });

  it("page가 0이나 음수라면, page를 1로 변경한다", () => {
    const minus = checkParameters(-1);
    const zero = checkParameters(0);
    expect(minus).toBe(DEFAULT_PAGE);
    expect(zero).toBe(DEFAULT_PAGE);
  });

  it("page가 전체 게시글 수보다 많으면 DEFAULT_PAGE로 변경한다", async () => {
    boardsModel.estimatedDocumentCount = jest.fn().mockReturnValue(20);
    const excess = await checkParameters(21);
    expect(excess).toBe(DEFAULT_PAGE);
  });

  it("(page-1)*limit이 전체 게시글 수와 같거나 크다면, page를 DEFAULT_PAGE로 변경한다", async () => {
    boardsModel.estimatedDocumentCount = jest.fn().mockReturnValue(100);
    const normal = await checkParameters(10);
    const excess = await checkParameters(11);
    expect(normal).toBe(10);
    expect(excess).toBe(DEFAULT_PAGE);
  });

  it("page 인자값 검사에 이상이 없을 경우, page 인자값을 그대로 return한다", async () => {
    boardsModel.estimatedDocumentCount = jest.fn().mockReturnValue(100);
    const one = await checkParameters(1);
    const ten = await checkParameters(10);
    expect(one).toBe(1);
    expect(ten).toBe(10);
  });

  it("page에 이상이 없을 경우, 게시글 리스트를 불러온다", async () => {
    const result = await getBoards({ page: 1 });
    expect(Array.isArray(result)).toBeTruthy();
  });
});
