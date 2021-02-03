import request from "supertest";
import { BAD_REQUEST, CREATED } from "http-status";
import cloneDeep from "clone-deep";
import boardsDummy from "@utils/dummy/boards.json";
import app from "!app";

describe("CreateBoards Intergration Test", () => {
  it("req.body에 이상이 없을 경우 200 상태 코드와 res.json을 전달한다", async () => {
    const response = await request(app).post("/api/boards").send(boardsDummy);
    expect(response.status).toBe(CREATED);
    expect(response.body.body).toBe(boardsDummy.body);
    expect(response.body.hashtag).toStrictEqual(boardsDummy.hashtag);
    expect(response.body.title).toBe(boardsDummy.title);
  });

  it("req.body에 body가 없을 경우, error message를 전달한다", async () => {
    const board = cloneDeep(boardsDummy);
    delete board.body;
    const response = await request(app).post("/api/boards").send(board);
    expect(response.status).toBe(BAD_REQUEST);
    expect(response.body).toStrictEqual({ message: "body is not exists" });
  });

  it("req.body에 body가 string이 아닐 경우, error message를 전달한다", async () => {
    const board = {
      body: 1,
      hashtag: ["해", "시", "태", "그"],
      title: "테스트 제목",
    };
    const response = await request(app).post("/api/boards").send(board);
    expect(response.status).toBe(BAD_REQUEST);
    expect(response.body).toStrictEqual({ message: "body must be string type" });
  });

  it("req.body에 body가 공백 일 경우, error message를 전달한다", async () => {
    const board = {
      body: "           ",
      hashtag: ["해", "시", "태", "그"],
      title: "테스트 제목",
    };
    const response = await request(app).post("/api/boards").send(board);
    expect(response.status).toBe(BAD_REQUEST);
    expect(response.body).toStrictEqual({ message: "body is not exists" });
  });

  it("req.body에 hashtag가 없을 경우 error message를 전달한다", async () => {
    const board = cloneDeep(boardsDummy);
    delete board.hashtag;
    const response = await request(app).post("/api/boards").send(board);
    expect(response.status).toBe(BAD_REQUEST);
    expect(response.body).toStrictEqual({ message: "hashtag is required at least one" });
  });

  it("req.body에 hashtag 갯수가 5개를 초과할 경우, error message를 전달한다", async () => {
    const board = cloneDeep(boardsDummy);
    board.hashtag.push("sdfdsaf", "dsfsdf");
    const response = await request(app).post("/api/boards").send(board);
    expect(response.status).toBe(BAD_REQUEST);
    expect(response.body).toStrictEqual({ message: "no more than 5 hashtags" });
  });

  it("req.body에 hashtag list에서 string이 아닌 경우, error message를 전달한다", async () => {
    const board = {
      body: "ㄴㄹㅇㄴㄹㄴㅇㄴㅇㄹ",
      hashtag: ["ㄴㅁㅇㄴㅁㅇㄴ", 1, 2, "23"],
      title: "테스트 제목",
    };
    const response = await request(app).post("/api/boards").send(board);
    expect(response.status).toBe(BAD_REQUEST);
    expect(response.body).toStrictEqual({ message: "hashtag must be string type" });
  });

  it("req.body에 title이 없을 경우 error message를 전달한다", async () => {
    const board = cloneDeep(boardsDummy);
    delete board.title;
    const response = await request(app).post("/api/boards").send(board);
    expect(response.status).toBe(BAD_REQUEST);
    expect(response.body).toStrictEqual({ message: "title is not exists" });
  });

  it("req.body에 title이 string이 아닐 경우, error message를 전달한다", async () => {
    const board = {
      body: "sdfdsfdsffdsdf",
      hashtag: ["해", "시", "태", "그"],
      title: 111,
    };
    const response = await request(app).post("/api/boards").send(board);
    expect(response.status).toBe(BAD_REQUEST);
    expect(response.body).toStrictEqual({ message: "title must be string type" });
  });

  it("req.body에 title이 공백 일 경우, error message를 전달한다", async () => {
    const board = {
      body: "테스트 본문",
      hashtag: ["해", "시", "태", "그"],
      title: "           ",
    };
    const response = await request(app).post("/api/boards").send(board);
    expect(response.status).toBe(BAD_REQUEST);
    expect(response.body).toStrictEqual({ message: "title is not exists" });
  });
});
