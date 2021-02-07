import request from "supertest";
import { OK } from "http-status";
import app from "!app";

describe("getCategoryBoards Integration Test", () => {
  /* 테스트 완료 항목
     1.req.params.category
      - middle/checkSpecialSymbols에서 category 테스트 완료
     2.req.query.page
      - getCategoryBoards Validator에서 page 유효성 테스트 완료
      - page 예외처리는 getCategoryBoards Service에서 테스트 완료(@utils/checkPageNumber)
  */

  it("category와 일치하는 게시글들을 찾은 경우, 200 상태 코드와 데이터를 전달한다", async () => {
    const result = await request(app).get("/api/boards/React?page=1");
    expect(result.status).toBe(OK);
    expect(result.body).not.toHaveLength(0);
    expect(Array.isArray(result.body)).toBeTruthy();
  });

  it("category와 일치하는 게시글이 없을 경우, 200 상태 코드와 길이가 0인 리스트를 전달한다", async () => {
    const result = await request(app).get("/api/boards/sdfsdfsd?page=1");
    expect(result.status).toBe(OK);
    expect(result.body).toHaveLength(0);
    expect(Array.isArray(result.body)).toBeTruthy();
  });
});
