import boardsModel from "@models/boards";
import deleteBoard from "./index";

boardsModel.findByIdAndDelete = jest.fn();

describe("deleteBoard Service", () => {
  it("deleteBoard 함수를 실행한다", () => {
    expect(typeof deleteBoard).toBe("function");
  });

  it("findAndDelete 함수를 실행한다", async () => {
    await deleteBoard({ id: "sdfsdfsdfds" });
    expect(boardsModel.findByIdAndDelete).toBeCalledWith("sdfsdfsdfds");
  });
});
