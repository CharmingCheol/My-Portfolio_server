/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "supertest";
import { BAD_REQUEST } from "http-status";
import app from "!app";

describe("getCategoryBoards Validator", () => {
  it("page가 존재하지 않은 경우, 400 에러와 메시지를 전달한다", async () => {
    const response = await request(app).get("/api/boards/React");
    expect(response.status).toBe(BAD_REQUEST);
    expect(response.body).toStrictEqual({ message: "page QS is not exists" });
  });

  it("page가 정수형이 아닌 경우, 400 에러와 메시지를 전달한다", async () => {
    const string = await request(app).get(`/api/boards/React?page=${"ee"}`);
    const boolean = await request(app).get(`/api/boards/React?page=${true}`);
    const array = await request(app).get(`/api/boards/React?page=${["d"]}`);

    expect(string.status).toBe(BAD_REQUEST);
    expect(boolean.status).toBe(BAD_REQUEST);
    expect(array.status).toBe(BAD_REQUEST);
    expect(string.body).toStrictEqual({ message: "page QS type must be integer type" });
    expect(boolean.body).toStrictEqual({ message: "page QS type must be integer type" });
    expect(array.body).toStrictEqual({ message: "page QS type must be integer type" });
  });
});
