import categorysModel from "@models/categorys";

const getCategorys = async () => {
  const result = await categorysModel.find({});
  return result;
};

export default getCategorys;
