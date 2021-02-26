import boardsModel from "@models/boards";
import boardResult from "@utils/dummy/boardResult.json";
import { OK_TEST_ID } from "@utils/const";
import BoardsService from "../index";

describe("BoardsService/getBoardById", () => {
  it("BoardsService.getBoardById를 호출한다", () => {
    expect(typeof BoardsService.getBoardById).toBe("function");
  });

  it("id에 해당되는 게시글을 리턴한다", async () => {
    boardsModel.create = jest.fn().mockReturnValue(boardResult);
    const result = await BoardsService.getBoardById({ id: OK_TEST_ID });
    expect(typeof result).toBe("object");
  });
});
