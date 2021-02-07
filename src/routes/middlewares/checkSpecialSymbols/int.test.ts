/* eslint-disable @typescript-eslint/no-explicit-any */
import request from "supertest";
import cloneDeep from "clone-deep";
import { BAD_REQUEST } from "http-status";
import boardDummy from "@utils/dummy/boards.json";
import app from "!app";

// bords/controllers/createBoards를 예시로 사용
async function checkSpecialSymbol(category) {
  const board = cloneDeep(boardDummy) as any;
  board.category = category;
  const response = await request(app).post("/api/boards").send(board);
  return response;
}

describe("checkSpecialSymbols Integration Test", () => {
  it("검사 대상이 문자열이 아닌 경우, 400 에러와 메시지를 전달한다", async () => {
    const intType = await checkSpecialSymbol(1);
    const booleanType = await checkSpecialSymbol(true);
    expect(intType.status).toBe(BAD_REQUEST);
    expect(booleanType.status).toBe(BAD_REQUEST);
    expect(intType.body).toStrictEqual({ message: "category must be string type" });
    expect(booleanType.body).toStrictEqual({ message: "category must be string type" });
  });

  it("검사 대상에 공백 문자가 포함되어 있는 경우, 400 에러와 메시지를 전달한다", async () => {
    const space = await checkSpecialSymbol("   ");
    expect(space.status).toBe(BAD_REQUEST);
    expect(space.body).toStrictEqual({ message: "category must not contain space" });
  });

  it("검사 대상에 특수문자가 포함되어 있는 경우, 400 에러와 메시지를 전달한다", async () => {
    const specialSymbol = await checkSpecialSymbol("sdfsdf!@#%&*");
    expect(specialSymbol.status).toBe(BAD_REQUEST);
    expect(specialSymbol.body).toStrictEqual({ message: "category must not contain special symbol" });
  });

  it("한글/영어가 혼합되어 있을 경우, 400 에러와 메시지를 전달한다", async () => {
    const MixedEnglishAndKorean = await checkSpecialSymbol("sdfsdfㄱㄷㄴㄷ");
    expect(MixedEnglishAndKorean.status).toBe(BAD_REQUEST);
    expect(MixedEnglishAndKorean.body).toStrictEqual({ message: "Korean and English should not be together" });
  });
});
