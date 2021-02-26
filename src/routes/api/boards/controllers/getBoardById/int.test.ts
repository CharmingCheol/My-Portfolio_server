import request from "supertest";
import { OK } from "http-status";
import { OK_TEST_ID } from "@utils/const";
import app from "!app";

describe("GetBoardById Intergration Test", () => {
  /* 테스트 완료 항목
   1.validators/getBoardById
   - MongoDB가 이해하지 못하는 ID를 전달 할 경우 확인
   2.boards/middlewares/checkNotFoundId
   - 존재하지 않는 ID를 전달 할 경우 확인
  */

  it("정상적인 id를 전달 할 경우, 200 상태 코드와 게시글 데이터를 전달한다", async () => {
    const response = await request(app).get(`/api/boards/React/${OK_TEST_ID}`);
    expect(response.status).toBe(OK);
    expect(response.body).not.toBeNull();
  });
});
