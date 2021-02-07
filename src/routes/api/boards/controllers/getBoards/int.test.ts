import request from "supertest";
import { OK } from "http-status";
import boardsModel from "@models/boards";
import app from "!app";

describe("getBoards Intergration Test", () => {
  /* 테스트 완료 항목
     1.req.query.page
      - getBoards Validator에서 page 유효성 테스트 완료
      - page 예외처리는 getBoards Service에서 테스트 완료(@utils/checkPageNumber) */

  it("page 유효 검사에 모두 만족할 경우, 200 상태 코드와 조건에 맞는 리스트를 받게 된다", async () => {
    const totalCount = await boardsModel.estimatedDocumentCount();
    const pageIndex = Math.floor(totalCount / 10) + 1;
    const boardList = await request(app).get(`/api/boards?page=${pageIndex}`);
    expect(boardList.status).toBe(OK);
    expect(boardList.body.length).toBeLessThanOrEqual(10);
  });
});
