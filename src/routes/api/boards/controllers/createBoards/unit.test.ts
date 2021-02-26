import httpMocks from "node-mocks-http";
import { CREATED } from "http-status";
import { BoardsService, CategorysService } from "@services/index";
import boardsDummy from "@utils/dummy/boards.json";
import createBoards from "./index";

BoardsService.createBoard = jest.fn();
CategorysService.increaseCategory = jest.fn();

const setup = async (body) => {
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();
  const next = jest.fn();
  req.body = body;
  await createBoards(req, res, next);
  return { createBoards, req, res, next };
};

describe("CreateBoards Unit Test", () => {
  it("createBoards contoller를 호출한다", () => {
    expect(typeof createBoards).toBe("function");
  });

  it("CategorysService.increaseCategory 함수를 호출한다", async () => {
    await setup(boardsDummy);
    expect(CategorysService.increaseCategory).toBeCalledWith({ category: boardsDummy.category });
  });

  it("BoardsService.createBoard 함수를 호출한다", async () => {
    await setup(boardsDummy);
    expect(BoardsService.createBoard).toBeCalledWith({
      body: boardsDummy.body,
      category: boardsDummy.category,
      hashtag: boardsDummy.hashtag,
      thumbnail: boardsDummy.thumbnail,
      title: boardsDummy.title,
    });
  });

  it("data의 이상이 없을 경우, 200 상태 코드와 함께 data를 리턴한다", async () => {
    BoardsService.createBoard = jest.fn().mockReturnValueOnce(boardsDummy);
    const { res } = await setup(boardsDummy);
    expect(res.statusCode).toBe(CREATED);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(boardsDummy);
  });

  it("서버 내부 에러가 발생 할 경우, 다음 미들웨어로 next한다", async () => {
    const errorMessage = { message: "error message" };
    const promiseRejected = Promise.reject(errorMessage);
    BoardsService.createBoard = jest.fn().mockReturnValueOnce(promiseRejected);
    const { next } = await setup(boardsDummy);
    expect(next).toBeCalledWith(errorMessage);
  });
});
