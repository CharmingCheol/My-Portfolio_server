import request from "supertest";
import cloneDeep from "clone-deep";
import { CREATED, NOT_FOUND } from "http-status";
import { NOT_FOUND_CATEGORY, NOT_FOUND_ID, OK_TEST_ID, WRONG_TEST_ID } from "@utils/const";
import dummy from "@utils/dummy/boards.json";
import app from "!app";

describe("updateBoard Intergration Test", () => {
  /* 테스트 완료 항목
     1.카테고리 유효성 검사
      - middlewares/checkSpecialSymbols에서 category 테스트 완료
     2.카테고리 텍스트 변환
      - utils/replaceCategory에서 테스트 완료
  */
  it("NOT_FOUND_CATEGORY를 전달받을 경우, 404와 메시지를 리턴한다", async () => {
    const dummyData = cloneDeep(dummy);
    dummyData.category = "sdsadsadds";
    const response = await request(app).put(`/api/boards/${dummyData.category}/${OK_TEST_ID}`).send(dummyData);
    expect(response.status).toBe(NOT_FOUND);
    expect(response.body).toStrictEqual({ message: NOT_FOUND_CATEGORY });
  });

  it("NOT_FOUND_ID를 전달받을 경우, 404와 메시지를 리턴한다", async () => {
    const response = await request(app).put(`/api/boards/${dummy.category}/${WRONG_TEST_ID}`).send(dummy);
    expect(response.status).toBe(NOT_FOUND);
    expect(response.body).toStrictEqual({ message: NOT_FOUND_ID });
  });

  it("문제점이 없을 경우 수정 된 데이터와 201을 리턴한다", async () => {
    const response = await request(app).put(`/api/boards/${dummy.category}/${OK_TEST_ID}`).send(dummy);
    expect(response.status).toBe(CREATED);
    expect(response.body.body).toBe(dummy.body);
    expect(response.body.category).toBe(dummy.category);
    expect(response.body.hashtag).toStrictEqual(dummy.hashtag);
    expect(response.body.thumbnail).toBe(dummy.thumbnail);
    expect(response.body.title).toBe(dummy.title);
    expect(response.body.created_at).not.toBe(response.body.updatedAt);
  });
});
