import request from "supertest";
import { NO_CONTENT } from "http-status";
import { OK_TEST_ID } from "@utils/const";
import app from "!app";

describe("deleteBoard Intergration Test", () => {
  /* 테스트 완료 항목
   1.validators/deleteBoard
   - MongoDB가 이해하지 못하는 ID를 전달 할 경우 확인
   2.boards/middlewares/checkNotFoundId
   - 존재하지 않는 ID를 전달 할 경우 확인
  */

  it("정상적인 id를 전달 할 경우, 204 상태 코드를 전달한다", async () => {
    const response = await request(app).delete(`/api/boards/React/${OK_TEST_ID}`);
    expect(response.status).toBe(NO_CONTENT);
  });
});
