import getCategoryBoards from "./index";

describe("getCategoryBoards Service", () => {
  it("getCategoryBoards를 호출한다", () => {
    expect(typeof getCategoryBoards).toBe("function");
  });

  it("mongoDB에게 받은 배열에서, 객체마다 조건에 맞는 카테고리가 포함된다", async () => {
    const category = "React";
    const result = await getCategoryBoards({ category, page: 1 });
    result.forEach((board) => {
      expect(board).toMatchObject({ category });
    });
  });
});
