import categorysModel from "@models/categorys";

const createCategory = async ({ category }: { category: string }) => {
  const findOne = await categorysModel.findOne({ category });
  if (!findOne) return await categorysModel.create({ category, count: 1 });
  return await categorysModel.findOneAndUpdate({ category }, { count: findOne.count + 1 }, { new: true });
};

export default createCategory;
