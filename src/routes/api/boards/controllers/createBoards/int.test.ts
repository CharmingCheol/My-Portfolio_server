/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "supertest";
import cloneDeep from "clone-deep";
import { CREATED } from "http-status";
import boardsDummy from "@utils/dummy/boards.json";
import app from "!app";

async function createBoard(category) {
  const board = cloneDeep(boardsDummy) as any;
  board.category = category;
  const response = await request(app).post("/api/boards").send(board);
  return response;
}

describe("CreateBoards Integration Test", () => {
  it("category가 영어인 경우, 이니셜은 대문자/나머지는 소문자인 형태로 전달한다", async () => {
    const allLowerCase = await createBoard("react");
    const initialUpperCase = await createBoard("React");
    const allUppercase = await createBoard("REACT");
    expect(allLowerCase.body.category).toBe("React");
    expect(initialUpperCase.body.category).toBe("React");
    expect(allUppercase.body.category).toBe("React");
  });

  it("category가 한글인 경우, 원래 값 그대로 category를 전달한다", async () => {
    const korean = await createBoard("차민철");
    expect(korean.body.category).toBe("차민철");
  });

  it("req.body에 이상이 없을 경우 200 상태 코드와 res.json을 전달한다", async () => {
    const response = await request(app).post("/api/boards").send(boardsDummy);
    expect(response.status).toBe(CREATED);
    expect(response.body.body).toBe(boardsDummy.body);
    expect(response.body.hashtag).toStrictEqual(boardsDummy.hashtag);
    expect(response.body.title).toBe(boardsDummy.title);
  });
});
