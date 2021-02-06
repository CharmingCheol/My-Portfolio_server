import httpMocks from "node-mocks-http";
import { OK } from "http-status";
import getBounds from "./index";

const setup = async (page) => {
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();
  const next = jest.fn();
  req.query.page = page;
  await getBounds(req, res, next);
  return { getBounds, req, res, next };
};

describe("getBounds unit test", () => {
  it("getBounds controller 함수를 호출한다", () => {
    expect(typeof getBounds).toBe("function");
  });

  it("paginated 리스트와 함께 200 상태 코드를 전달한다", async () => {
    const { res } = await setup(1);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(OK);
    expect(Array.isArray(res._getJSONData())).toBeTruthy();
  });
});
