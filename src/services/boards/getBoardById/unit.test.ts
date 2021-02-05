import boardsModel from "@models/boards";
import boardResult from "@utils/dummy/boardResult.json";
import { NOT_FOUND_ID, OK_TEST_ID, WRONG_TEST_ID } from "@utils/const";
import getBoardyId from "./index";

describe("getBoardById Service", () => {
  it("getBoardById Service를 호출한다", () => {
    expect(typeof getBoardyId).toBe("function");
  });

  it("id가 있을 경우 해당되는 게시글을 준다", async () => {
    boardsModel.create = jest.fn().mockReturnValue(boardResult);
    const result = await getBoardyId({ _id: OK_TEST_ID });
    expect(typeof result).toBe("object");
  });

  it("id가 없을 경우 에러 메시지 텍스트를 전달한다", async () => {
    boardsModel.create = jest.fn().mockReturnValue(null);
    const result = await getBoardyId({ _id: WRONG_TEST_ID });
    expect(result).toStrictEqual(NOT_FOUND_ID);
  });
});
