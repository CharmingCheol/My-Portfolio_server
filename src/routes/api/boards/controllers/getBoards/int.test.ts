import request from "supertest";
import { BAD_REQUEST, OK } from "http-status";
import boardsModel from "@models/boards";
import { WRONG_PAGE_TYPE } from "@utils/const";
import app from "!app";

describe("getBoards Intergration Test", () => {
  it("page가 숫자 형태의 문자열이 아닌 경우, 400 에러와 메시지를 전달한다", async () => {
    const number = await request(app).get(`/api/boards?page=${1}`);
    const stringNumber = await request(app).get(`/api/boards?page=1`);
    const string = await request(app).get(`/api/boards?page=qwe`);
    const boolean = await request(app).get(`/api/boards?page=${true}`);
    expect(number.status).toBe(OK);
    expect(stringNumber.status).toBe(OK);
    expect(string.status).toBe(BAD_REQUEST);
    expect(string.body).toStrictEqual({ message: WRONG_PAGE_TYPE });
    expect(boolean.status).toBe(BAD_REQUEST);
    expect(boolean.body).toStrictEqual({ message: WRONG_PAGE_TYPE });
  });

  it("page가 0이거나 음수인 경우, 첫번째 페이지에 속한 리스트를 받게 된다", async () => {
    const pageOne = await request(app).get(`/api/boards?page=${1}`);
    const pageZero = await request(app).get(`/api/boards?page=${0}`);
    const pageMinus = await request(app).get(`/api/boards?page=${-1}`);
    expect(pageZero.body).toStrictEqual(pageOne.body);
    expect(pageMinus.body).toStrictEqual(pageOne.body);
  });

  it("page가 전체 컬렉션 갯수보다 클 경우, 첫번째 페이지에 속한 리스트를 받게 된다", async () => {
    const pageOne = await request(app).get(`/api/boards?page=${1}`);
    const pageExcess = await request(app).get(`/api/boards?page=${10000000}`);
    expect(pageExcess.body).toStrictEqual(pageOne.body);
  });

  it("(page-1)*limit이 전체 게시글 수와 같거나 크다면, 첫번째 페이지에 속한 리스트를 받게 된다", async () => {
    const totalCount = await boardsModel.estimatedDocumentCount();
    const exceededPageIndex = Math.floor(totalCount / 10) + 2; // 초과를 확인하기 위해 2를 더함
    const pageOne = await request(app).get(`/api/boards?page=${1}`);
    const pageExcess = await request(app).get(`/api/boards?page=${exceededPageIndex}`);
    expect(pageExcess.body).toStrictEqual(pageOne.body);
  });

  it("page 유효 검사에 모두 만족할 경우, 200 상태 코드와 조건에 맞는 리스트를 받게 된다", async () => {
    const totalCount = await boardsModel.estimatedDocumentCount();
    const pageIndex = Math.floor(totalCount / 10) + 1;
    const boardList = await request(app).get(`/api/boards?page=${pageIndex}`);
    expect(boardList.status).toBe(OK);
    expect(boardList.body.length).toBeLessThanOrEqual(10);
  });
});
