import httpMocks from "node-mocks-http";
import { OK } from "http-status";
import { BoardsService } from "@services/index";
import getCategoryBoardsCount from "./index";

BoardsService.getCategoryBoardsCount = jest.fn();

const setup = async ({ category }: { category: string }) => {
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();
  const next = jest.fn();
  req.params.category = category;
  await getCategoryBoardsCount(req, res, next);
  return { req, res, next };
};

describe("getCategoryBoardsCount Unit Test", () => {
  it("getCategoryBoardsCount 함수를 호출한다", () => {
    expect(typeof getCategoryBoardsCount).toBe("function");
  });

  it("BoardsService.getCategoryBoardsCount 함수를 호출한다", async () => {
    await setup({ category: "React" });
    expect(BoardsService.getCategoryBoardsCount).toBeCalledWith({ category: "React" });
  });

  it("카테고리 게시글 수와 200 상태 코드를 리턴한다", async () => {
    BoardsService.getCategoryBoardsCount = jest.fn().mockReturnValueOnce(12);
    const { res } = await setup({ category: "React" });
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(OK);
    expect(res._getJSONData()).toBe(12);
  });

  it("서버 내부 에러가 발생 할 경우, 다음 미들웨어로 next한다", async () => {
    const errorMessage = { message: "error message" };
    const promiseRejected = Promise.reject(errorMessage);
    BoardsService.getCategoryBoardsCount = jest.fn().mockReturnValueOnce(promiseRejected);
    const { next } = await setup({ category: "React" });
    expect(next).toBeCalledWith(errorMessage);
  });
});
