/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "supertest";
import { CREATED } from "http-status";
import boardsDummy from "@utils/dummy/boards.json";
import app from "!app";

describe("CreateBoards Integration Test", () => {
  it("req.body에 이상이 없을 경우 200 상태 코드와 res.json을 전달한다", async () => {
    const response = await request(app).post("/api/boards").send(boardsDummy);
    expect(response.status).toBe(CREATED);
    expect(response.body.body).toBe(boardsDummy.body);
    expect(response.body.category).toBe(boardsDummy.category);
    expect(response.body.hashtag).toStrictEqual(boardsDummy.hashtag);
    expect(response.body.title).toBe(boardsDummy.title);
    expect(response.body.thumbnail).toBe(boardsDummy.thumbnail);
  });
});
