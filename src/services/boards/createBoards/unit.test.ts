import boardsModel from "@models/boards";
import boardsData from "@utils/dummy/boards.json";
import createBoards from "./index";

describe("service/createBoards", () => {
  it("createBoards 함수를 호출한다", () => {
    expect(typeof createBoards).toBe("function");
  });

  it("create 함수를 호출 할 때 boardsData를 인자값으로 준다", async () => {
    boardsModel.create = jest.fn();
    await createBoards(boardsData);
    expect(boardsModel.create).toBeCalledWith(boardsData);
  });
});
