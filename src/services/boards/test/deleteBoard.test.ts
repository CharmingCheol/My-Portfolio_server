import boardsModel from "@models/boards";
import BoardsService from "../index";

boardsModel.findByIdAndDelete = jest.fn();

describe("BoardsService/deleteBoard", () => {
  it("BoardsService.deleteBoard 함수를 실행한다", () => {
    expect(typeof BoardsService.deleteBoard).toBe("function");
  });

  it("findAndDelete 함수를 실행한다", async () => {
    await BoardsService.deleteBoard({ id: "sdfsdfsdfds" });
    expect(boardsModel.findByIdAndDelete).toBeCalledWith("sdfsdfsdfds");
  });
});
