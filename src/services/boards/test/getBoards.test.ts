import BoardsService from "../index";

describe("BoardsService/getBoards", () => {
  it("BoardsService.getBoards 함수를 호출한다", () => {
    expect(typeof BoardsService.getBoards).toBe("function");
  });

  it("page에 이상이 없을 경우, 게시글 리스트를 불러온다", async () => {
    const result = await BoardsService.getBoards({ page: 1 });
    expect(Array.isArray(result)).toBeTruthy();
  });
});
