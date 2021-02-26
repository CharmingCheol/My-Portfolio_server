import httpMocks from "node-mocks-http";
import { OK } from "http-status";
import { CategorysService } from "@services/index";
import getCategorys from "./index";

CategorysService.getCategoryList = jest.fn();

const setup = async () => {
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();
  const next = jest.fn();
  await getCategorys(req, res, next);
  return { getCategorys, req, res, next };
};

describe("getCategorys Unit Test", () => {
  it("getCategorys를 호출한다", () => {
    expect(typeof getCategorys).toBe("function");
  });

  it("CategorysService.getCategoryList 함수를 호출한다", async () => {
    await setup();
    expect(CategorysService.getCategoryList).toBeCalledWith();
  });

  it("카테고리 리스트와 200 상태 코드를 리턴한다", async () => {
    const mockCategoryList = ["React", "Vue"];
    CategorysService.getCategoryList = jest.fn().mockReturnValueOnce(mockCategoryList);
    const { res } = await setup();
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(OK);
    expect(res._getJSONData()).toStrictEqual(mockCategoryList);
  });

  it("서버 내부 에러가 발생 할 경우, 다음 미들웨어로 next한다", async () => {
    const errorMessage = { message: "error message" };
    const promiseRejected = Promise.reject(errorMessage);
    CategorysService.getCategoryList = jest.fn().mockReturnValueOnce(promiseRejected);
    const { next } = await setup();
    expect(next).toBeCalledWith(errorMessage);
  });
});
