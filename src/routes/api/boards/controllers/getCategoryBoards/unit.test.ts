import httpMocks from "node-mocks-http";
import { OK } from "http-status";
import { BoardsService } from "@services/index";
import getCategoryBoards from "./index";

BoardsService.getCategoryBoards = jest.fn();

const setup = async ({ category, page }: { category: string; page: number }) => {
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();
  const next = jest.fn();
  req.params.category = category;
  req.query.page = page.toString();
  await getCategoryBoards(req, res, next);
  return { getCategoryBoards, req, res, next };
};

describe("getCategoryBoards Unit Test", () => {
  it("getCategoryBoards 함수를 호출한다", () => {
    expect(typeof getCategoryBoards).toBe("function");
  });

  it("BoardsService.getCategoryBoards 함수를 호출한다", async () => {
    await setup({ category: "React", page: 1 });
    expect(BoardsService.getCategoryBoards).toBeCalledWith({ category: "React", page: 1 });
  });

  it("카테고리와 일치하는 게시글들을 찾은 경우, 200 상태 코드와 리스트를 돌려준다", async () => {
    BoardsService.getCategoryBoards = jest.fn().mockReturnValueOnce([{}, {}]);
    const { res } = await setup({ category: "React", page: 1 });
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(OK);
    expect(Array.isArray(res._getJSONData())).toBeTruthy();
    expect(res._getJSONData()).not.toHaveLength(0);
  });

  it("존재하지 않은 카테고리를 전달받은 경우, 200 상태 코드와 길이가 0인 리스트를 돌려준다", async () => {
    BoardsService.getCategoryBoards = jest.fn().mockReturnValueOnce([]);
    const { res } = await setup({ category: "ㅁㄴㅇㅁㄴㅇㅁㄴ", page: 1 });
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(OK);
    expect(Array.isArray(res._getJSONData())).toBeTruthy();
    expect(res._getJSONData()).toHaveLength(0);
  });

  it("서버 내부 에러가 발생 할 경우, 다음 미들웨어로 next한다", async () => {
    const errorMessage = { message: "error message" };
    const promiseRejected = Promise.reject(errorMessage);
    BoardsService.getCategoryBoards = jest.fn().mockReturnValueOnce(promiseRejected);
    const { next } = await setup({ category: "React", page: 1 });
    expect(next).toBeCalledWith(errorMessage);
  });
});
