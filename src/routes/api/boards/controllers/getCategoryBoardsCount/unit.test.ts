import httpMocks from "node-mocks-http";
import { OK } from "http-status";
import getCategoryBoardsCount from "./index";

const setup = async ({ category }: { category: string }) => {
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();
  const next = jest.fn();
  req.params.category = category;
  await getCategoryBoardsCount(req, res, next);
  return { req, res, next };
};

describe("getCategoryBoardsCount Unit Test", () => {
  it("getCategoryBoardsCount 함수를 호출한다", () => {
    expect(typeof getCategoryBoardsCount).toBe("function");
  });

  it("카테고리 게시글 수와 200 상태 코드를 리턴한다", async () => {
    const { res } = await setup({ category: "React" });
    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(OK);
    expect(typeof res._getJSONData()).toBe("number");
  });
});
