import categorysModel from "@models/categorys";
import { NOT_FOUND_CATEGORY } from "@utils/const";

const decreaseCategory = async ({ category }) => {
  const caetgoryData = await categorysModel.findOne({ category });
  if (!caetgoryData) return NOT_FOUND_CATEGORY;
  const updated = await categorysModel.findOneAndUpdate({ category }, { count: caetgoryData.count - 1 }, { new: true });
  if (!updated.count) return await categorysModel.findOneAndDelete({ category });
  return updated;
};

export default decreaseCategory;
