import httpMocks from "node-mocks-http";
import { CREATED } from "http-status";
import boardsModel from "@models/boards";
import boardsDummy from "@utils/dummy/boards.json";
import createBoards, { checkCategory } from "./index";

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

  it("category가 영어인 경우, 이니셜을 대문자로 바꾸고 나머지는 소문자로 변경한다", () => {
    const allLowerCase = checkCategory("react");
    const initialUpperCase = checkCategory("React");
    const allUppercase = checkCategory("REACT");
    expect(allLowerCase).toBe("React");
    expect(initialUpperCase).toBe("React");
    expect(allUppercase).toBe("React");
  });

  it("category가 한글인 경우, 파라미터를 그대로 돌려준다", () => {
    const korean = checkCategory("차민철");
    expect(korean).toBe("차민철");
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
    expect(res.statusCode).toBe(CREATED);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(dataWithIdAdded);
  });
});
