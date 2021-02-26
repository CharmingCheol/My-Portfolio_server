import categorysModel from "@models/categorys";
import { NOT_FOUND_CATEGORY } from "@utils/const";

class CategorysService {
  // 카테고리 수 감소
  static async decreaseCategory({ category }) {
    const caetgoryData = await categorysModel.findOne({ category });
    if (!caetgoryData) return NOT_FOUND_CATEGORY;
    const updated = await categorysModel.findOneAndUpdate(
      { category },
      { count: caetgoryData.count - 1 },
      { new: true },
    );
    if (!updated.count) {
      await categorysModel.findOneAndDelete({ category });
      return;
    }
    return updated;
  }

  // 카테고리 리스트 불러오기
  static async getCategoryList() {
    const result = await categorysModel.find({});
    return result;
  }

  // 카테고리 수 증가
  static async increaseCategory({ category }) {
    const findOne = await categorysModel.findOne({ category });
    if (!findOne) return await categorysModel.create({ category, count: 1 });
    return await categorysModel.findOneAndUpdate({ category }, { count: findOne.count + 1 }, { new: true });
  }
}

export default CategorysService;
