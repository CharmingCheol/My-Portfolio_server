/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "supertest";
import { BAD_REQUEST } from "http-status";
import { OK_TEST_ID, NOT_UNDERSTAND_ID } from "@utils/const";
import app from "!app";

interface IParameters {
  category?: any;
  id?: any;
  message: string;
}

async function getBoardById({ category, id, message }: IParameters) {
  const response = await request(app).get(`/api/boards/${category}/${id}`);
  expect(response.status).toBe(BAD_REQUEST);
  expect(response.body).toStrictEqual({ message });
}

describe("getBoardById Validator", () => {
  it("category param이 trim을 했을 때 빈 값이 되는 경우, 400 에러와 메시지를 출력한다", async () => {
    await getBoardById({ category: "  ", id: OK_TEST_ID, message: "category is not exists" });
  });

  it("ID param이 MongoDB가 이해하지 못하는 값인 경우, 400 에러와 메시지를 출력한다", async () => {
    await getBoardById({ category: "React", id: "fsdfdf", message: NOT_UNDERSTAND_ID });
  });
});
