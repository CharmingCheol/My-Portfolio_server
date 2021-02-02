import cloneDeep from "clone-deep";
import httpMocks from "node-mocks-http";
import { BAD_REQUEST, OK } from "http-status";
import boardsModel from "@models/boards";
import boardsDummy from "@utils/dummy/boards.json";
import {
  DOES_NOT_EXISTS_BODY,
  DOES_NOT_EXISTS_HASH_TAG,
  DOES_NOT_EXISTS_TITLE,
  GREATER_THAN_HASH_TAG,
} from "@utils/const";
import createBoards from "./index";

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
  it("createBoardsService 내부에 있는 boardsModel.create를 호출한다", async () => {
    boardsModel.create = jest.fn();
    await setup(boardsDummy);
    expect(boardsModel.create).toBeCalledWith(boardsDummy);
  });

  it("title 데이터가 없을 경우, 400 에러와 함께 메시지를 리턴한다", async () => {
    jest.mock("@services/boards/createBoards", () => ({ createBoards: () => [BAD_REQUEST, DOES_NOT_EXISTS_TITLE] }));
    const board = { ...boardsDummy };
    delete board.title;
    const { res } = await setup(board);
    expect(res.statusCode).toBe(BAD_REQUEST);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual({ message: DOES_NOT_EXISTS_TITLE });
  });

  it("body 데이터가 없을 경우, 400 에러와 함께 메시지를 리턴한다", async () => {
    jest.mock("@services/boards/createBoards", () => ({ createBoards: () => [BAD_REQUEST, DOES_NOT_EXISTS_BODY] }));
    const board = { ...boardsDummy };
    delete board.body;
    const { res } = await setup(board);
    expect(res.statusCode).toBe(BAD_REQUEST);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual({ message: DOES_NOT_EXISTS_BODY });
  });

  it("hashtag 데이터가 없을 경우, 400 에러와 함께 메시지를 리턴한다", async () => {
    jest.mock("@services/boards/createBoards", () => ({ createBoards: () => [BAD_REQUEST, DOES_NOT_EXISTS_HASH_TAG] }));
    const board = { ...boardsDummy };
    delete board.hashtag;
    const { res } = await setup(board);
    expect(res.statusCode).toBe(BAD_REQUEST);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual({ message: DOES_NOT_EXISTS_HASH_TAG });
  });

  it("hashtag 데이터 갯수가 5개를 초과 할 경우, 400 에러와 함께 메시지를 리턴한다", async () => {
    jest.mock("@services/boards/createBoards", () => ({ createBoards: () => [BAD_REQUEST, GREATER_THAN_HASH_TAG] }));
    const board = cloneDeep(boardsDummy);
    board.hashtag.push("d", "1");
    const { res } = await setup(board);
    expect(res.statusCode).toBe(BAD_REQUEST);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual({ message: GREATER_THAN_HASH_TAG });
  });

  it("서버 내부 에러가 발생 할 경우, 다음 미들웨어로 next한다", async () => {
    const errorMessage = { message: "error message" };
    const promiseRejected = Promise.reject(errorMessage);
    boardsModel.create = jest.fn().mockReturnValueOnce(promiseRejected);
    const { next } = await setup(boardsDummy);
    expect(next).toBeCalledWith(errorMessage);
  });

  it("data의 이상이 없을 경우, 200 상태 코드와 함께 data를 리턴한다", async () => {
    const board = { ...boardsDummy };
    const dataWithIdAdded = { ...boardsDummy, ...{ _id: "12andjkadhoi" } };
    jest.mock("@services/boards/createBoards", () => ({ createBoards: () => dataWithIdAdded }));
    boardsModel.create = jest.fn().mockReturnValueOnce(dataWithIdAdded);
    const { res } = await setup(board);
    expect(res.statusCode).toBe(OK);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(dataWithIdAdded);
  });
});
