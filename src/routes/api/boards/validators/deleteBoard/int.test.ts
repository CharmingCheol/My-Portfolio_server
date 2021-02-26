/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "supertest";
import { BAD_REQUEST } from "http-status";
import { NOT_UNDERSTAND_ID } from "@utils/const";
import app from "!app";

async function deleteBoardValidator(id, message) {
  const response = await request(app).delete(`/api/boards/React/${id}`);
  expect(response.status).toBe(BAD_REQUEST);
  expect(response.body).toStrictEqual({ message });
}

describe("deleteBoard Validator", () => {
  it("mongoDB가 이해하지 못하는 id를 전달 할 경우, 400과 메시지를 전달한다", async () => {
    await deleteBoardValidator("sdfsdf", NOT_UNDERSTAND_ID);
    await deleteBoardValidator(123, NOT_UNDERSTAND_ID);
    await deleteBoardValidator(true, NOT_UNDERSTAND_ID);
  });
});
