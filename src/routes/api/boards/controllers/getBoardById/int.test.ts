import request from "supertest";
import { BAD_REQUEST, NOT_FOUND, OK } from "http-status";
import { ERROR_TEST_ID, NOT_FOUND_ID, NOT_UNDERSTAND_ID, OK_TEST_ID, WRONG_TEST_ID } from "@utils/const";
import boardResult from "@utils/dummy/boardResult.json";
import app from "!app";

describe("GetBoardById Intergration Test", () => {
  it("id를 통해 알맞은 게시글을 찾지 못할 경우, 404 상태 코드와 에러 메시지를 전달한다", async () => {
    const response = await request(app).get(`/api/boards/React/${WRONG_TEST_ID}`);
    expect(response.status).toBe(NOT_FOUND);
    expect(response.body).toStrictEqual({ message: NOT_FOUND_ID });
  });

  it("mongoDB가 이해하지 못하는 ID를 전달 할 경우, 400 상태 코드와 에러 메시지를 전달한다", async () => {
    const response = await request(app).get(`/api/boards/React/${ERROR_TEST_ID}`);
    expect(response.status).toBe(BAD_REQUEST);
    expect(response.body).toStrictEqual({ message: NOT_UNDERSTAND_ID });
  });

  it("정상적인 id를 전달 할 경우, 200 상태 코드와 에러 메시지를 전달한다", async () => {
    const response = await request(app).get(`/api/boards/React/${OK_TEST_ID}`);
    expect(response.status).toBe(OK);
    expect(response.body).toStrictEqual(boardResult);
  });
});
