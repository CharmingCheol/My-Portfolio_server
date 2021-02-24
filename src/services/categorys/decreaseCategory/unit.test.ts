import categorysModel from "@models/categorys";
import { NOT_FOUND_CATEGORY } from "@utils/const";
import decreaseCategory from "./index";

const COUNT = 50;
categorysModel.findOneAndUpdate = jest.fn();
categorysModel.findOneAndDelete = jest.fn();

describe("CategoryService/decreaseCategory", () => {
  it("decreaseCategory 함수를 호출한다", () => {
    expect(typeof decreaseCategory).toBe("function");
  });

  it("findOneAndUpdate 함수를 호출한다", async () => {
    categorysModel.findOne = jest.fn().mockReturnValue({ category: "React", count: COUNT });
    categorysModel.findOneAndUpdate = jest.fn().mockReturnValue({ category: "React", count: COUNT - 1 });
    await decreaseCategory({ category: "React" });
    expect(categorysModel.findOneAndUpdate).toBeCalledWith({ category: "React" }, { count: COUNT - 1 }, { new: true });
  });

  it("해당되는 카테고리가 존재하지 않을 경우, 함수를 종료한다", async () => {
    categorysModel.findOne = jest.fn().mockReturnValue(null);
    const result = await decreaseCategory({ category: "React" });
    expect(result).toBe(NOT_FOUND_CATEGORY);
  });

  it("해당되는 카테고리의 count를 -1 한다", async () => {
    categorysModel.findOne = jest.fn().mockReturnValue({ category: "React", count: COUNT });
    categorysModel.findOneAndUpdate = jest.fn().mockReturnValue({ category: "React", count: COUNT - 1 });
    const result = await decreaseCategory({ category: "React" });
    expect(result).toStrictEqual({ category: "React", count: COUNT - 1 });
  });

  it("count를 -1 했을 때 0이 될 경우, category data를 전부 제거한다", async () => {
    categorysModel.findOne = jest.fn().mockReturnValue({ category: "React", count: 1 });
    categorysModel.findOneAndUpdate = jest.fn().mockReturnValue({ category: "React", count: 0 });
    await decreaseCategory({ category: "React" });
    expect(categorysModel.findOneAndDelete).toBeCalledWith({ category: "React" });
  });
});
