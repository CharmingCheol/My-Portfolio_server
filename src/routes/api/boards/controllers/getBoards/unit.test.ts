import httpMocks from "node-mocks-http";
import { OK } from "http-status";
import { BoardsService } from "@services/index";
import getBounds from "./index";

BoardsService.getBoards = jest.fn();

const setup = async (page) => {
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();
  const next = jest.fn();
  req.query.page = page;
  await getBounds(req, res, next);
  return { getBounds, req, res, next };
};

describe("getBounds unit test", () => {
  it("getBounds 함수를 호출한다", () => {
    expect(typeof BoardsService.getBoards).toBe("function");
  });

  it("BoardsService.getBounds 함수를 호출한다", async () => {
    await setup(1);
    expect(BoardsService.getBoards).toBeCalledWith({ page: 1 });
  });

  it("paginated 리스트와 함께 200 상태 코드를 전달한다", async () => {
    BoardsService.getBoards = jest.fn().mockReturnValueOnce([]);
    const { res } = await setup(1);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(OK);
    expect(Array.isArray(res._getJSONData())).toBeTruthy();
  });

  it("서버 내부 에러가 발생 할 경우, 다음 미들웨어로 next한다", async () => {
    const errorMessage = { message: "error message" };
    const promiseRejected = Promise.reject(errorMessage);
    BoardsService.getBoards = jest.fn().mockReturnValueOnce(promiseRejected);
    const { next } = await setup(1);
    expect(next).toBeCalledWith(errorMessage);
  });
});
