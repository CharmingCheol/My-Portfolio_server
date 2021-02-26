import httpMocks from "node-mocks-http";
import { NOT_FOUND } from "http-status";
import boardsModel from "@models/boards";
import { WRONG_TEST_ID, NOT_FOUND_ID } from "@utils/const";
import checkNotFoundID from "./index";

boardsModel.findById = jest.fn();

const setup = async (id) => {
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();
  const next = jest.fn();
  req.params.id = id;
  await checkNotFoundID(req, res, next);
  return { req, res, next };
};

describe("CheckNotFoundID Middleware Unit Test", () => {
  it("checkNotFoundID 함수를 호출한다", () => {
    expect(typeof checkNotFoundID).toBe("function");
  });

  it("findById를 호출한다", async () => {
    await setup("sfdsf");
    expect(boardsModel.findById).toBeCalledWith("sfdsf");
  });

  it("호출 결과가 null인 경우 404와 메시지를 전달한다", async () => {
    boardsModel.findById = jest.fn().mockReturnValueOnce(null);
    const { res } = await setup(WRONG_TEST_ID);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(NOT_FOUND);
    expect(res._getJSONData()).toStrictEqual({ message: NOT_FOUND_ID });
  });

  it("호출 결과가 null이 아닌 경우 next()를 호출한다", async () => {
    boardsModel.findById = jest.fn().mockReturnValueOnce({});
    const { next } = await setup(WRONG_TEST_ID);
    expect(next).toBeCalledWith();
  });
});
