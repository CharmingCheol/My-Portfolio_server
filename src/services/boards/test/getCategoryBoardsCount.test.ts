import boardsModel from "@models/boards";
import BoardsService from "../index";

describe("BoardsService/getCategoryBoardsCount", () => {
  it("BoardsService.getCategoryBoardsCount 함수를 호출한다", () => {
    expect(typeof BoardsService.getCategoryBoardsCount).toBe("function");
  });

  it("해당되는 카테고리 게시글의 갯수를 리턴한다", async () => {
    const POST_COUNT = 12;
    boardsModel.countDocuments = jest.fn().mockReturnValue(POST_COUNT);
    const result = await BoardsService.getCategoryBoardsCount({ category: "React" });
    expect(result).toBe(POST_COUNT);
  });
});
