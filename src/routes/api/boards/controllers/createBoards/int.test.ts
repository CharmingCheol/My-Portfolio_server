import request from "supertest";
import { BAD_REQUEST, OK } from "http-status";
import cloneDeep from "clone-deep";
import boardsDummy from "@utils/dummy/boards.json";
import {
  DOES_NOT_EXISTS_BODY,
  DOES_NOT_EXISTS_HASH_TAG,
  DOES_NOT_EXISTS_TITLE,
  GREATER_THAN_HASH_TAG,
} from "@utils/const";
import app from "!app";

describe("CreateBoards Intergration Test", () => {
  it("req.body에 이상이 없을 경우 200 상태 코드와 res.json을 전달한다", async () => {
    const response = await request(app).post("/api/boards").send(boardsDummy);
    expect(response.status).toBe(OK);
    expect(response.body.body).toBe(boardsDummy.body);
    expect(response.body.hashtag).toStrictEqual(boardsDummy.hashtag);
    expect(response.body.title).toBe(boardsDummy.title);
  });

  it("req.body에 body가 없을 경우 400 에러와 error message를 전달한다", async () => {
    const board = cloneDeep(boardsDummy);
    delete board.body;
    const response = await request(app).post("/api/boards").send(board);
    expect(response.status).toBe(BAD_REQUEST);
    expect(response.body).toStrictEqual({ message: DOES_NOT_EXISTS_BODY });
  });

  it("req.body에 hashtag가 없을 경우 400 에러와 error message를 전달한다", async () => {
    const board = cloneDeep(boardsDummy);
    delete board.hashtag;
    const response = await request(app).post("/api/boards").send(board);
    expect(response.status).toBe(BAD_REQUEST);
    expect(response.body).toStrictEqual({ message: DOES_NOT_EXISTS_HASH_TAG });
  });

  it("req.body에 hashtag 갯수가 5개를 초과할 경우, 400 에러와 error message를 전달한다", async () => {
    const board = cloneDeep(boardsDummy);
    board.hashtag.push("sdfdsaf", "dsfsdf");
    const response = await request(app).post("/api/boards").send(board);
    expect(response.status).toBe(BAD_REQUEST);
    expect(response.body).toStrictEqual({ message: GREATER_THAN_HASH_TAG });
  });

  it("req.body에 title이 없을 경우 400 에러와 error message를 전달한다", async () => {
    const board = cloneDeep(boardsDummy);
    delete board.title;
    const response = await request(app).post("/api/boards").send(board);
    expect(response.status).toBe(BAD_REQUEST);
    expect(response.body).toStrictEqual({ message: DOES_NOT_EXISTS_TITLE });
  });
});
