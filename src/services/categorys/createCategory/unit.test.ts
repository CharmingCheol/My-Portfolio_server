import categorysModel from "@models/categorys";
import createCategory from "./index";

categorysModel.create = jest.fn();
categorysModel.findOneAndUpdate = jest.fn();

describe("CategoryService/createCategory", () => {
  it("존재하지 않는 카테고리일 경우, 해당 카테고리를 추가한다", async () => {
    categorysModel.findOne = jest.fn().mockReturnValue(null);
    await createCategory({ category: "React" });
    expect(categorysModel.create).toBeCalledWith({ category: "React", count: 1 });
  });

  it("이미 존재하는 카테고리일 경우, count를 1 증가한다", async () => {
    categorysModel.findOne = jest.fn().mockReturnValue({ category: "React", count: 1 });
    await createCategory({ category: "React" });
    expect(categorysModel.findOneAndUpdate).toBeCalledWith({ category: "React" }, { count: 2 }, { new: true });
  });
});
