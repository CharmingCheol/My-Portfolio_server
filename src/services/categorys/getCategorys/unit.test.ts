import categorysModel from "@models/categorys";
import getCategorys from "./index";

describe("CategoryService/getCategorys", () => {
  it("category list 전체를 불러온다", async () => {
    categorysModel.find = jest.fn().mockReturnValue(["React", "Vue"]);
    const result = await getCategorys();
    expect(result).toStrictEqual(["React", "Vue"]);
  });
});
