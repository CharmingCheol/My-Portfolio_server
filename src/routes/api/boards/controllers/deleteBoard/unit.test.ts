import httpMocks from "node-mocks-http";
import { NO_CONTENT } from "http-status";
import { BoardsService, CategorysService } from "@services/index";
import { OK_TEST_ID } from "@utils/const";
import deleteBoard from "./index";

BoardsService.deleteBoard = jest.fn();
CategorysService.decreaseCategory = jest.fn();

const setup = async () => {
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();
  const next = jest.fn();
  req.params.category = "React";
  req.params.id = OK_TEST_ID;
  await deleteBoard(req, res, next);
  return { req, res, next };
};

describe("DeleteBoard Unit Tetst", () => {
  it("deleteBoard 함수를 호출한다", () => {
    expect(typeof deleteBoard).toBe("function");
  });

  it("CategorysService.decreaseCategory 함수를 호출한다", async () => {
    await setup();
    expect(CategorysService.decreaseCategory).toBeCalledWith({ category: "React" });
  });

  it("BoardsService.deleteBoard 함수를 호출한다", async () => {
    await setup();
    expect(BoardsService.deleteBoard).toBeCalledWith({ id: OK_TEST_ID });
  });

  it("리턴값으로 204 상태 코드와 메시지를 전달한다", async () => {
    const { res } = await setup();
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(NO_CONTENT);
    expect(res._getJSONData()).toStrictEqual({ message: "The board has been deleted" });
  });

  it("서버 내부 에러가 발생 할 경우, 다음 미들웨어로 next한다", async () => {
    const errorMessage = { message: "error message" };
    const promiseRejected = Promise.reject(errorMessage);
    BoardsService.deleteBoard = jest.fn().mockReturnValueOnce(promiseRejected);
    const { next } = await setup();
    expect(next).toBeCalledWith(errorMessage);
  });
});
