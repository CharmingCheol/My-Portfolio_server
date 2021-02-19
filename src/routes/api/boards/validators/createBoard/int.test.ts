/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "supertest";
import { BAD_REQUEST } from "http-status";
import cloneDeep from "clone-deep";
import boardsDummy from "@utils/dummy/boards.json";
import app from "!app";

async function checkBodyData(board, message) {
  const response = await request(app).post("/api/boards").send(board);
  expect(response.status).toBe(BAD_REQUEST);
  expect(response.body).toStrictEqual({ message });
}

describe("createBoard Validator", () => {
  it("body가 없을 경우, error message를 전달한다", async () => {
    const board = cloneDeep(boardsDummy);
    delete board.body;
    await checkBodyData(board, "body is not exists");
  });

  it("body가 string이 아닐 경우, error message를 전달한다", async () => {
    const board = cloneDeep(boardsDummy) as any;
    board.body = 1;
    await checkBodyData(board, "body must be string type");
  });

  it("body가 공백 일 경우, error message를 전달한다", async () => {
    const board = cloneDeep(boardsDummy) as any;
    board.body = "      ";
    await checkBodyData(board, "body is not exists");
  });

  it("category가 없을 경우, error message를 전달한다", async () => {
    const board = cloneDeep(boardsDummy);
    delete board.category;
    await checkBodyData(board, "category is not exists");
  });

  it("category가 string이 아닐 경우, error message를 전달한다", async () => {
    const board = cloneDeep(boardsDummy) as any;
    board.category = 111;
    await checkBodyData(board, "category must be string type");
  });

  it("category가 공백으로 되어있을 경우, error message를 전달한다", async () => {
    const board = cloneDeep(boardsDummy);
    board.category = "    ";
    await checkBodyData(board, "category is not exists");
  });

  it("hashtag가 없을 경우 error message를 전달한다", async () => {
    const board = cloneDeep(boardsDummy);
    delete board.hashtag;
    await checkBodyData(board, "hashtag is required at least one");
  });

  it("hashtag 갯수가 5개를 초과할 경우, error message를 전달한다", async () => {
    const board = cloneDeep(boardsDummy);
    board.hashtag.push("sdfdsaf", "dsfsdf");
    await checkBodyData(board, "no more than 5 hashtags");
  });

  it("hashtag list에서 string이 아닌 경우, error message를 전달한다", async () => {
    const board = cloneDeep(boardsDummy) as any;
    board.hashtag = ["ㄴㅁㅇㄴㅁㅇㄴ", 1, 2, "23"];
    await checkBodyData(board, "hashtag must be string type");
  });

  it("thumbnail이 없을 경우 error message를 전달한다", async () => {
    const board = cloneDeep(boardsDummy);
    delete board.thumbnail;
    await checkBodyData(board, "thumbnail is not exists");
  });

  it("thumbnail이 string이 아닐 경우, error message를 전달한다", async () => {
    const board = cloneDeep(boardsDummy) as any;
    board.thumbnail = 111;
    await checkBodyData(board, "thumbnail must be URL");
  });

  it("thumbnail이 url type이 아닐 경우, error message를 전달한다", async () => {
    const board = cloneDeep(boardsDummy) as any;
    board.thumbnail = "ㅇㄴㄹㄴㅇㄹㄴㅇㄹ";
    await checkBodyData(board, "thumbnail must be URL");
  });

  it("title이 없을 경우 error message를 전달한다", async () => {
    const board = cloneDeep(boardsDummy);
    delete board.title;
    await checkBodyData(board, "title is not exists");
  });

  it("title이 string이 아닐 경우, error message를 전달한다", async () => {
    const board = cloneDeep(boardsDummy) as any;
    board.title = 111;
    await checkBodyData(board, "title must be string type");
  });

  it("title이 공백 일 경우, error message를 전달한다", async () => {
    const board = cloneDeep(boardsDummy);
    board.title = "      ";
    await checkBodyData(board, "title is not exists");
  });
});
