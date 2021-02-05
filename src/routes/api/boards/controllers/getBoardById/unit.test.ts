import httpMocks from "node-mocks-http";
import { NOT_FOUND, OK } from "http-status";
import { NOT_FOUND_ID, OK_TEST_ID, WRONG_TEST_ID } from "@utils/const";
import boardResult from "@utils/dummy/boardResult.json";
import getBoardById from "./index";

const setup = async (id) => {
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();
  const next = jest.fn();
  req.params.id = id;
  await getBoardById(req, res, next);
  return { getBoardById, req, res, next };
};

afterEach(() => {
  jest.clearAllMocks();
});

describe("getBoardById Controller Unit Test", () => {
  it("getBoardById Controller를 호출한다", () => {
    expect(typeof getBoardById).toBe("function");
  });

  it("id에 이상이 없을 경우 200과 함께 게시글 데이터를 전달한다", async () => {
    jest.mock("@services/boards/getBoardById", () => ({ getBoardById: () => boardResult }));
    const { res } = await setup(OK_TEST_ID);
    expect(res.statusCode).toBe(OK);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(boardResult);
  });

  it("존재하지 않은 id일 경우, 404에러와 함께 메시지를 전달한다", async () => {
    jest.mock("@services/boards/getBoardById", () => ({ getBoardById: () => NOT_FOUND_ID }));
    const { res } = await setup(WRONG_TEST_ID);
    expect(res.statusCode).toBe(NOT_FOUND);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual({ message: NOT_FOUND_ID });
  });
});
