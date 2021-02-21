import request from "supertest";
import { OK } from "http-status";
import app from "!app";

describe("getCategoryBoardsCount Integration Test", () => {
  /* 테스트 완료 항목
     1.req.params.category
      - middlewares/checkSpecialSymbols에서 category 테스트 완료
  */

  it("카테고리에 해당하는 게시글 수와 200 상태 코드를 리턴한다", async () => {
    const result = await request(app).get("/api/boards/count/React");
    expect(result.status).toBe(OK);
    expect(typeof result.body).toBe("number");
  });
});
