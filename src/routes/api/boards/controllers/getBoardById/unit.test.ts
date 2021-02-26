import httpMocks from "node-mocks-http";
import { OK } from "http-status";
import { BoardsService } from "@services/index";
import { OK_TEST_ID } from "@utils/const";
import boardResult from "@utils/dummy/boardResult.json";
import getBoardById from "./index";

BoardsService.getBoardById = jest.fn();

const setup = async (id) => {
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();
  const next = jest.fn();
  req.params.id = id;
  await getBoardById(req, res, next);
  return { getBoardById, req, res, next };
};

describe("getBoardById Unit Test", () => {
  it("getBoardById Controller를 호출한다", () => {
    expect(typeof getBoardById).toBe("function");
  });

  it("BoardsService.getBoardById 함수를 호출한다", async () => {
    await setup(OK_TEST_ID);
    expect(BoardsService.getBoardById).toBeCalledWith({ id: OK_TEST_ID });
  });

  it("id에 이상이 없을 경우 200과 함께 게시글 데이터를 전달한다", async () => {
    BoardsService.getBoardById = jest.fn().mockReturnValueOnce(boardResult);
    const { res } = await setup(OK_TEST_ID);
    expect(res.statusCode).toBe(OK);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(boardResult);
  });

  it("서버 내부 에러가 발생 할 경우, 다음 미들웨어로 next한다", async () => {
    const errorMessage = { message: "error message" };
    const promiseRejected = Promise.reject(errorMessage);
    BoardsService.getBoardById = jest.fn().mockReturnValueOnce(promiseRejected);
    const { next } = await setup(OK_TEST_ID);
    expect(next).toBeCalledWith(errorMessage);
  });
});
