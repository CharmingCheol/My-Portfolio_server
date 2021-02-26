import categorysModel from "@models/categorys";
import CategorysService from "../index";

describe("CategorysService/getCategoryList", () => {
  it("getCategoryList 함수를 호출한다", () => {
    expect(typeof CategorysService.getCategoryList).toBe("function");
  });

  it("category list 전체를 불러온다", async () => {
    categorysModel.find = jest.fn().mockReturnValue(["React", "Vue"]);
    const result = await CategorysService.getCategoryList();
    expect(result).toStrictEqual(["React", "Vue"]);
  });
});
