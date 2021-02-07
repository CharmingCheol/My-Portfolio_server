import getBoards from "./index";

describe("getBoards Service", () => {
  it("getBoards 함수를 호출한다", () => {
    expect(typeof getBoards).toBe("function");
  });

  it("page에 이상이 없을 경우, 게시글 리스트를 불러온다", async () => {
    const result = await getBoards({ page: 1 });
    expect(Array.isArray(result)).toBeTruthy();
  });
});
