import categorysModel from "@models/categorys";
import createCategory from "./index";

describe("CategoryService/createCategory", () => {
  it("존재하지 않는 카테고리일 경우, 해당 카테고리를 추가한다", async () => {
    categorysModel.create = jest.fn();
    categorysModel.findOne = jest.fn().mockReturnValue(null);
    await createCategory({ category: "React" });
    expect(categorysModel.create).toBeCalledWith({ category: "React" });
  });

  it("이미 존재하는 카테고리일 경우, 해당 카테고리를 추가하지 않는다", async () => {
    categorysModel.create = jest.fn();
    categorysModel.findOne = jest.fn().mockReturnValue({ category: "React" });
    await createCategory({ category: "React" });
    expect(categorysModel.create).not.toBeCalledWith();
  });
});
