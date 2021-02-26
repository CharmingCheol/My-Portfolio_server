import BoardsService from "../index";

describe("BoardsService/getCategoryBoards", () => {
  it("BoardsService.getCategoryBoards를 호출한다", () => {
    expect(typeof BoardsService.getCategoryBoards).toBe("function");
  });

  it("mongoDB에게 받은 배열에서, 객체마다 조건에 맞는 카테고리가 포함된다", async () => {
    const category = "React";
    const result = await BoardsService.getCategoryBoards({ category, page: 1 });
    result.forEach((board) => {
      expect(board).toMatchObject({ category });
    });
  });
});
