import categorysModel from "@models/categorys";

const createCategory = async ({ category }: { category: string }) => {
  const findOne = await categorysModel.findOne({ category });
  if (!findOne) await categorysModel.create({ category });
};

export default createCategory;
