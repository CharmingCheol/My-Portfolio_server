import httpMocks from "node-mocks-http";
import { OK } from "http-status";
import categorysModdel from "@models/categorys";
import getCategorys from "./index";

const setup = async () => {
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();
  const next = jest.fn();
  await getCategorys(req, res, next);
  return { getCategorys, req, res, next };
};

describe("getCategorys Unit Test", () => {
  it("controller를 호출한다", () => {
    expect(typeof getCategorys).toBe("function");
  });

  it("카테고리 리스트와 200 상태 코드를 리턴한다", async () => {
    const mockCategoryList = ["React", "Vue"];
    jest.mock("@services/categorys", () => ({ getCategorysService: () => mockCategoryList }));
    const { res } = await setup();
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(OK);
    expect(res._getJSONData()).toStrictEqual(mockCategoryList);
  });

  it("에러가 발생 할 경우 next를 호출한다", async () => {
    const errorMessage = { message: "error message" };
    const promiseRejected = Promise.reject(errorMessage);
    categorysModdel.find = jest.fn().mockReturnValue(promiseRejected);
    const { next } = await setup();
    expect(next).toBeCalledWith(errorMessage);
  });
});
