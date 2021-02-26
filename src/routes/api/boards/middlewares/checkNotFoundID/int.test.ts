/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "supertest";
import { NOT_FOUND } from "http-status";
import { WRONG_TEST_ID, NOT_FOUND_ID } from "@utils/const";
import app from "!app";

describe("CheckNotFoundID Middleware Integration Test", () => {
  /*
    게시글 삭제를 예시로 진행  
  */
  it("존재하지 않은 ID를 전달 할 경우 404와 메시지를 전달한다", async () => {
    const response = await request(app).delete(`/api/boards/React/${WRONG_TEST_ID}`);
    expect(response.status).toBe(NOT_FOUND);
    expect(response.body).toStrictEqual({ message: NOT_FOUND_ID });
  });
});
